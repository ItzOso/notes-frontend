import { useSignOut } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import {LuLogOut} from "react-icons/lu"
import Categories from "./Categories";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const auth = useAuthUser();
    const {username} = auth()
    const signOut = useSignOut();
    return (
        <div className="bg-primary1 w-2/12 h-screen flex flex-col justify-between py-4">
            <div>
                <div className="flex justify-between items-center text-gray1 text-lg p-6 px-8">
                    <p>{username}</p>
                    <LuLogOut className="hover:cursor-pointer hover:scale-110" size="1.1em" onClick={signOut} />
                </div>
                <Categories/>
            </div>
            
        </div>
    );
}

export default Sidebar;
