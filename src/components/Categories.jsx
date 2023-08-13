import { BiPlus } from "react-icons/bi";
import { useAuthHeader } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { createCategoryApi } from "../services/notesApi";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../redux/notesSlice";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryNotesAmount } from "../utils/utils";

function Categories() {
    const inputRef = useRef(null);
    const [input, setInput] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const authUser = useAuthUser();
    const authHeader = useAuthHeader();

    const state = useSelector((state) => state.notesSlice);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            if (input) {
                const payload = {
                    name: input,
                    userId: authUser()._id,
                };
                const result = await createCategoryApi(payload, authHeader());

                dispatch(createCategory(result.data));
                setInput("");
                navigate(`/notes/${result.data._id}`)
            }
            setInputVisible(false);
        } catch (error) {
            console.log(error);
            setInput("");
            setInputVisible(false);
        }
    };

    const handleClickCategory = (category) => {
        navigate(`/notes/${category._id}`);
    };

    return (
        <div className="flex flex-col gap-1">
            <div className=" flex justify-between items-center text-white text-md font-bold tracking-[0.2em] p-8 mt-10">
                <p>CATEGORIES</p>
                <BiPlus
                    onClick={() => {
                        setInputVisible(true);
                        setTimeout(() => {
                            inputRef.current.focus();
                        }, 100);
                    }}
                    className="hover:cursor-pointer hover:scale-110"
                    size="1.5em"
                />
            </div>
            {inputVisible && (
                <form onSubmit={handleAddCategory} className="px-8">
                    <input
                        onBlur={() => setInputVisible(false)}
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="category name"
                        className="p-2 px-3  bg-gray2 outline-none rounded-md w-full"
                    />
                </form>
            )}

            {/* render categories here */}

            <div className="h-[60vh] overflow-y-auto">
                {state?.categories?.map((category) => (
                    <div
                        onClick={() => handleClickCategory(category)}
                        key={category._id}
                        className="flex justify-between items-center text-gray2 opacity-90 hover:cursor-pointer p-3 px-9 hover:opacity-80 hover:bg-primary2 ">
                        <p className="">{category.name}</p>
                        <p className="px-2">{categoryNotesAmount(category, state)}</p>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Categories;
