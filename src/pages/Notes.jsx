import Sidebar from "../components/Sidebar";
import Middlebar from "../components/Middlebar";
import Editor from "../components/Editor";
import { useEffect } from "react";
import { getNotesAndCategoriesApi } from "../services/notesApi";
import { useDispatch } from "react-redux";
import { useAuthHeader } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { getNotesAndCategories } from "../redux/notesSlice";
import { Outlet } from "react-router-dom";

function Notes() {
    const dispatch = useDispatch();
    const authUser = useAuthUser();
    const authHeader = useAuthHeader();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getNotesAndCategoriesApi(authUser()._id, authHeader());
                dispatch(getNotesAndCategories(result.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="flex">
            <Sidebar/>
            <Outlet/>
            {/* <Middlebar/>
            <Editor/> */}
        </div>
    );
}

export default Notes;
