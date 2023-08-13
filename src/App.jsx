import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { RequireAuth } from "react-auth-kit";
import Notes from "./pages/Notes";
import Middlebar from "./components/Middlebar";
import Editor from "./components/Editor";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route
                path="notes"
                element={
                    <RequireAuth loginPath="/login">
                        <Notes />
                    </RequireAuth>
                }>
                    <Route path=":categoryId" element={<Middlebar/>}>
                        <Route path=":noteId" element={<Editor/>}/>
                    </Route>
                </Route>
        </Routes>
    );
}

export default App;
