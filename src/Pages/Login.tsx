import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import UserType from "../Types/UserType";

function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [users, setUsers] = useState<UserType[]>([]);
    const [model, setModel] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    function clearData() {
        setUsername("");
        setPassword("");
        setError(false);
    }




    async function loginSystem() {

        try {
            if (username === "" || password === "") {
                console.log("Please fill username or password");

            } else {


                const response = await axios.get("http://localhost:8082/users");

                setUsers(response.data);

                {
                    users.map(function (user) {
                        if (user.username == username && user.password == password) {
                            console.log("Success");
                            setModel(true);
                            navigate("/home");
                        } else {
                            setError(true);
                        }


                    })
                }



            }
        } catch (error) {
            console.log(error);
        }

    }




    return (
        <div className="container mx-auto my-5">
            <div className="border-2 border-black rounded-lg shadow-2xl w-[500px] h-[450px] lg:mx-[400px] my-[100px] bg-black">
                <h1 className="text-center font-bold text-3xl mt-3 text-white">Login</h1>
                <div>
                    <img src="/src/assets/user.jpg" className="mx-auto w-[100px] my-5" />

                </div>

                <div>
                    <form>
                        <h1 className="mx-10 inline-flex text-lg text-white">Username</h1>
                        <input type="text" className="w-[300px] px-3 py-2 border-2 border-black rounded-lg" value={username} placeholder="Username" onChange={function (event) {
                            setUsername(event.target.value);
                        }} />

                        <h1 className="mx-10 inline-flex text-lg mt-5 text-white">Password</h1>
                        <input type="password" className="w-[300px] px-3 py-2 border-2 border-black mx-1 rounded-lg" value={password} placeholder="Password" onChange={function (event) {
                            setPassword(event.target.value);
                        }} />
                        <Link to="/user"><p className="text-blue-600 mx-[150px] my-3 ">Create account</p></Link>

                        {error ? <p className="text-red-600 text-center ">Username or Password invalid</p> : <p></p>}

                        <div className=" mx-[150px] inline-flex">
                            <button type="button" className=" border-2 bg-green-500 w-24 p-2 m-3 font-semibold  rounded-lg text-center" onClick={loginSystem}>Login</button>
                            <button type="button" className=" border-2 bg-red-500 w-24 p-2 m-3 font-semibold  rounded-lg text-center" onClick={clearData}>Cancel</button>
                        </div>
                    </form>

                    {model && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg border w-[400px]">
                                <h2 className="text-xl font-semibold mb-4">Status</h2>

                                <p className="text-center font-bold text-green-600 text-lg">Login Successfully !!!</p>


                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login;