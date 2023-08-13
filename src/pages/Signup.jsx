import { useFormik } from "formik";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import NotebookIMG from "../images/login-notebook.svg";
import { signup } from "../services/authApi";
import { useIsAuthenticated } from "react-auth-kit";
import { useEffect, useState } from "react";

function Signup() {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const [error, setError] = useState("")

    // doesnt let user access this page if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/notes");
        }
    });

    const onSubmit = async (values) => {
        try {
            const result = await signup({
                username: values.username,
                email: values.email,
                password: values.password,
            });
            console.log(result.data);

            navigate("/login");
        } catch (error) {
            console.log(error);
            setError(error.response.data.error)
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            username: yup.string().max(20, "Must be 20 characters or less").required("Required"),
            email: yup.string().email("Please enter a valid email").required("Required"),
            password: yup.string().min(8, "Must be atleast 8 characters").required("Required"),
        }),
        onSubmit,
    });
    return (
        <div className="w-screen h-screen flex">
            <Link to="/">
                <IoClose
                    size="3em"
                    className="fixed top-3 right-3 hover:cursor-pointer text-white hover:text-gray2 md:text-black"
                />
            </Link>
            <div className="bg-gray1 w-2/6 h-full flex flex-col justify-center items-center xl:w-3/6 md:w-full">
                <p className="text-4xl mb-3 sm:text-3xl">Create your account</p>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 sm:w-full sm:items-center">
                    {error && <p className="p-3 bg-red-500 text-white w-full rounded-md text-center">{error}</p>}
                    <div className="flex flex-col w-96 sm:w-5/6">
                        <label className=" mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            className={`p-3  bg-gray2 outline-none rounded-md ${
                                formik.touched.username && formik.errors.username ? "border-[1px] border-red-500" : ""
                            }`}
                            type="text"
                            id="username"
                            placeholder="username"
                            {...formik.getFieldProps("username")}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="mt-1 text-red-500">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="flex flex-col w-96 sm:w-5/6">
                        <label className=" mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`p-3  bg-gray2 outline-none rounded-md ${
                                formik.touched.email && formik.errors.email ? "border-[1px] border-red-500" : ""
                            }`}
                            type="text"
                            id="email"
                            placeholder="email"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="mt-1 text-red-500">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="flex flex-col w-96 sm:w-5/6">
                        <label className=" mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            className={`p-3  bg-gray2 outline-none rounded-md ${
                                formik.touched.password && formik.errors.password ? "border-[1px] border-red-500" : ""
                            }`}
                            type="password"
                            id="password"
                            placeholder="password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="mt-1 text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="bg-primary1 px-5 py-3 rounded-lg text-white text-xl hover:bg-primary2 mt-1 w-96 sm:w-5/6">
                        Sign up
                    </button>
                </form>
                <p className="mt-2">
                    Already signed up?{" "}
                    <Link to="/login">
                        <span className="text-primary1 font-semibold">Login</span>
                    </Link>
                </p>
            </div>
            <div className="w-4/6 h-full bg-primary1 flex justify-center items-center lg:w-3/6 md:hidden">
                <img className="w-5/6" src={NotebookIMG} alt="" />
            </div>
        </div>
    );
}

export default Signup;
