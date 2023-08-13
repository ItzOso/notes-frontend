import { BiPlus, BiTrash } from "react-icons/bi";
import NotesList from "./NotesList";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryNotesAmount } from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { changeCategoryNameApi, createNoteApi, deleteCategoryApi } from "../services/notesApi";
import { changeCategoryName, createNote, deleteCategory } from "../redux/notesSlice";

function Middlebar() {
    const { categoryId } = useParams();
    const state = useSelector((state) => state.notesSlice);
    const category = state.categories.filter((category) => category._id === categoryId)[0];
    const notes = state.notes.filter((note) => note.category === categoryId);
    const navigate = useNavigate();

    useEffect(() => {
        if (!category) {
            navigate("/notes");
        }
    });

    const authHeader = useAuthHeader();
    const authUser = useAuthUser();

    const dispatch = useDispatch();

    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState("");
    const inputRef = useRef();

    const handleChangeName = async (e) => {
        e.preventDefault();
        try {
            if (name) {
                const payload = {
                    name,
                };

                await changeCategoryNameApi(payload, categoryId, authHeader());

                dispatch(changeCategoryName({ name, categoryId }));
                setName("");
            }
            setEditingName(false);
        } catch (error) {
            console.log(error);
            setName("");
            setEditingName(false);
        }
    };

    const handleCreateNote = async () => {
        try {
            const payload = { categoryId, userId: authUser()._id };
            const result = await createNoteApi(payload, authHeader());

            dispatch(createNote(result.data))

            navigate(result.data._id)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            await deleteCategoryApi(categoryId, authHeader())

            dispatch(deleteCategory({categoryId}))
            navigate("/notes")
        } catch (error) {
            console.log(error)
        }
    }

    const [filter, setFilter] = useState("")
    const filteredNotes = notes.filter((note) => note.title.includes(filter));
    

    return (
        <>
            <div className="bg-gray1 w-3/12 h-screen flex flex-col">
                <div className="p-10">
                    <div className="flex justify-between">
                        {editingName ? (
                            <form onSubmit={handleChangeName}>
                                <input
                                    onBlur={() => setEditingName(false)}
                                    ref={inputRef}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="category name"
                                    className="p-2 px-3  bg-gray2 outline-none rounded-md w-full"
                                />
                            </form>
                        ) : (
                            <p
                                onClick={() => {
                                    setEditingName(true);
                                    setTimeout(() => {
                                        inputRef.current.focus();
                                    }, 100);
                                }}
                                className="text-xl hover:cursor-pointer">
                                {category?.name}
                            </p>
                        )}
                        <BiTrash onClick={handleDeleteCategory} className="text-gray-300 hover:text-red-500 hover:cursor-pointer" size="1.5em" />
                    </div>
                    <div className="flex flex-col gap-2 mt-6">
                        <p className="text-gray-400">{categoryNotesAmount(category, state)} Notes</p>
                        <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                            className="p-3  bg-gray2 outline-none rounded-md w-full"
                            type="text"
                            placeholder="Search notes"
                        />
                        <button
                            onClick={handleCreateNote}
                            className="flex bg-primary1 rounded-md p-3 w-full text-white justify-center items-center hover:bg-primary2">
                            <BiPlus className="mr-2 mb-1" size="1.5em" />
                            ADD NOTE
                        </button>
                    </div>
                </div>
                <NotesList filteredNotes={filteredNotes} category={category} />
            </div>
            <Outlet />
        </>
    );
}

export default Middlebar;
