import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function User() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const [stay, setStay] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);



    async function createUser() {

        try {
            if (username === "" || password === "") {

                setError(true);
                console.log("Please fill username or password");

            } else {
                const details = {
                    username: username,
                    password: password
                }

                await axios.post("http://localhost:8080/users", details);
                console.log(details);
                setStay(true);
                setTimeout(() => {
                    navigate("/");  // Change "/login" to your actual login route
                }, 3000);


            }
        } catch (error) {
            console.log(error);
        }




    }

    function clearData() {
        setUsername("");
        setPassword("");
        setError(false);
    }






    return (
        <div className="container mx-auto my-5">
            <div className="border-2 border-black rounded-lg shadow-2xl w-[500px] h-[400px] lg:mx-[400px]  my-[100px] bg-black">
                <h1 className="text-center font-bold text-3xl mt-3 text-blue-600">Create Account</h1>
                <div>
                    <img src="/src/assets/user.jpg" className="mx-auto w-[100px] my-5" />

                </div>

                <div>
                    <form>
                        <h1 className="mx-10 inline-flex text-lg text-white">Username</h1>
                        <input type="text" className="w-[300px] px-3 py-2 border-2 border-black rounded-lg" placeholder="Username" value={username} onChange={function (event) {
                            setUsername(event.target.value);
                        }} />

                        <h1 className="mx-10 inline-flex text-lg mt-5 text-white">Password</h1>
                        <input type="password" className="w-[300px] px-3 py-2 border-2 border-black mx-1 rounded-lg" placeholder="Password" value={password} onChange={function (event) {
                            setPassword(event.target.value);
                        }} />

                        {error ?
                            <h1 className="text-red-600 text-center mt-2">Please fill username and password</h1> : <h1></h1>
                        }


                        <div className="mx-5 mt-3 inline-flex">
                            <button type="button" className=" border-2 bg-green-500  p-2 m-2 font-semibold  rounded-lg text-center" onClick={createUser}>Create account</button>
                            <button type="button" className=" border-2 bg-red-500 p-2 m-2 font-semibold  rounded-lg text-center " onClick={clearData}>Cancel</button>
                        </div>
                    </form>

                    {stay && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg">
                                <h2 className="text-xl font-bold mb-4 text-green-600">Successfully Registered !!!</h2>
                                <p className="text-center text-red-600 font-semibold">Redirecting to login...</p>

                            </div>
                        </div>
                    )}
                </div>


            </div>



        </div>
    )
}

export default User;