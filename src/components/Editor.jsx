import { useEffect, useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAutosave } from "react-autosave";
import { deleteNoteApi, updateNoteApi } from "../services/notesApi";
import { useAuthHeader } from "react-auth-kit";
import { deleteNote, updateNote } from "../redux/notesSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import CategoryDropdown from "./CategoryDropdown";

function Editor() {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    const { categoryId, noteId } = useParams();
    const state = useSelector((state) => state.notesSlice);
    const note = state.notes.filter((note) => note._id === noteId)[0];
    const category = state.categories.filter((category) => category._id === categoryId)[0];
    const categories = state.categories
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authHeader = useAuthHeader();
    const inputRef = useRef();
    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content);

    useEffect(() => {
        if (!note) {
            navigate(`/notes/${categoryId}`);
        }
    }, []);

    useEffect(() => {
        setContent(note?.content);
    }, [noteId]);

    const handleSaveContent = async () => {
        try {
            const payload = { content };
            const result = await updateNoteApi(payload, noteId, authHeader());

            dispatch(updateNote({ updatedNote: result.data, noteId }));
        } catch (error) {
            console.log(error);
        }
    };
    useAutosave({ data: content, onSave: handleSaveContent });

    const handleChangeTitle = async (e) => {
        e.preventDefault();
        try {
            if (title && title !== note.title) {
                const payload = { title };
                const result = await updateNoteApi(payload, noteId, authHeader());

                dispatch(updateNote({ updatedNote: result.data, noteId }));

                setTitle(result.data.title);
            }
            setEditingTitle(false);
        } catch (error) {
            console.log(error);
            setTitle(note?.title);
            setEditingTitle(false);
        }
    };

    const handleDeleteNote = async () => {
        try {
           await deleteNoteApi(noteId, authHeader())

           dispatch(deleteNote({noteId}))
           navigate(`/notes/${categoryId}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-7/12">
            <div className="flex justify-between p-6">
                <div className="flex items-center gap-6">
                    {/* dispays title and lets you edit it */}
                    {editingTitle ? (
                        <form onSubmit={handleChangeTitle}>
                            <input
                                onBlur={() => setEditingTitle(false)}
                                ref={inputRef}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="note title"
                                className="p-2 px-3 text-lg bg-gray2 outline-none rounded-md w-full"
                            />
                        </form>
                    ) : (
                        <p
                            onClick={() => {
                                setEditingTitle(true);
                                setTimeout(() => {
                                    inputRef.current.focus();
                                }, 100);
                            }}
                            className="text-2xl hover:cursor-pointer">
                            {note?.title}
                        </p>
                    )}
                    {/* dropdown menu to change note category */}
                    <CategoryDropdown categories={categories} category={category}/>
                </div>
                {/* button to send note to trash */}
                <BiTrash onClick={handleDeleteNote} className="text-gray-300 hover:text-red-500 hover:cursor-pointer" size="1.5em" />
            </div>
            {/* note editor */}
            <div className="">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    theme="snow"
                    modules={modules}
                    formats={formats}></ReactQuill>
            </div>
        </div>
    );
}

export default Editor;
