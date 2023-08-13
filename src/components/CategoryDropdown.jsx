import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { updateNoteApi } from "../services/notesApi";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { useDispatch } from "react-redux";
import { updateNote } from "../redux/notesSlice";

function Dropdown({ categories, category }) {
    const [isOpen, setIsOpen] = useState(false);
    const listCategories = categories.filter((cat) => cat._id !== category._id);
    const dropdownRef = useRef();

    const closeOpenMenu = (e) => {
        if (dropdownRef.current && isOpen && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeOpenMenu);
    });

    const {noteId} = useParams()
    const authHeader = useAuthHeader()
    const dispatch = useDispatch()

    const handleChangeCategory = async (category) => {
        try {
            const payload = { categoryId: category._id };
            const result = await updateNoteApi(payload, noteId, authHeader());

            dispatch(
                updateNote({
                    updatedNote: result.data,
                    noteId,
                })
            );
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className=" hover:bg-gray2 bg-gray1 flex gap-2 items-center px-2 py-1 rounded">
                {category?.name}
                {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
            </button>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute top-10 whitespace-nowrap [&>*:first-child]:rounded-t [&>*:last-child]:rounded-b">
                    {listCategories.map((category) => (
                        <p onClick={() => handleChangeCategory(category)} className="hover:bg-gray2 bg-gray1 p-2 hover:cursor-pointer" key={category._id}>
                            {category.name}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
