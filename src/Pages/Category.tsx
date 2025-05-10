import axios from "axios";
import CategoryType from "../Types/CategoryType";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Category() {

    const [showImg, setImage] = useState(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [description, setDescription] = useState<string>("");



    async function loadCategories() {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);

        } catch (error) {
            console.log(error);
        }

    }







    async function addCategory() {
        try {
            await axios.post("http://localhost:8080/categories", {
                cname: categoryName,
                description: description
            }
            )


        } catch (error) {
            console.log(error);
        }

        loadCategories();

        setCategoryName("");
        setDescription("");
    }

    const [editCategory, setEditCategory] = useState<CategoryType | null>(null);

    function editCategories(category: CategoryType) {
        setEditCategory(category);
        setCategoryName(category.cname);
        setDescription(category.description);
    }


    async function updateCategory() {
        try {
            await axios.put(`http://localhost:8080/categories/${editCategory?.cid}`, {
                cname: categoryName,
                description: description
            });


        } catch (error) {
            console.log(error);
        }

        loadCategories();
        setCategoryName("");
        setDescription("");
    }

    async function deleteCategory(categoryId: number) {
        try {
            await axios.delete(`http://localhost:8080/categories/${categoryId}`);

        } catch (error) {
            console.log(error);
        }

        loadCategories();
    }





    useEffect(function () {

        setTimeout(() => {
            setImage(false);

        }, 3000)
        loadCategories();
        console.log(loadCategories.length);
    }, [])










    return (
        <div>

            {
                showImg ? (
                    <img src="/src/assets/R.gif" className="block mx-auto my-48" />
                ) : (



                    <div className="container mx-auto p-5">

                        <h1 className="text-center font-semibold text-blue-700 text-7xl font-mono italic">Category</h1>
                        <Link to="/home" className="hover:text-red-600 text-lg font-bold">Back</Link>


                        <form>
                            <div className="border-2 mt-10 border-black shadow-lg rounded-xl bg-gray-800">
                                <div>
                                    <p className="mx-5 my-5 text-white text-2xl">Category Name </p> <br />
                                    <input type="text" className="mx-3 border-2 border-black rounded-lg p-3 w-full sm:w-[300px] lg:w-[700px] max-w-[800px] " placeholder="Category Name" value={categoryName} onChange={function handleCategoryName(event) {
                                        setCategoryName(event.target.value);
                                    }} /><br />
                                </div>
                                <div>
                                    <p className="mx-5 my-5 text-white text-2xl">Description</p>
                                    <textarea name="description" className="mx-3 my-5 border-2 border-black px-3 py-5 rounded-lg  w-full sm:w-[300px] lg:w-[600px] max-w-[800px]" placeholder="Write here about category description" value={description} onChange={function handleDescription(event) {
                                        setDescription(event.target.value);
                                    }}></textarea><br />
                                </div>

                                <div className="text-black mx-5 my-5 p-3 bg-green-400 w-40 text-center rounded-2xl font-bold hover:bg-white animate-bounce">
                                    <button type="button" onClick={editCategory ? updateCategory : addCategory}>{editCategory ? "Update Category" : "Add Category"}</button>
                                </div>

                            </div>

                        </form>


                        <table className="table-auto mt-5 sm:w-[500px] lg:w-[1200px] md:w-[800px]">
                            <thead>
                                <tr className="bg-slate-500">
                                    <th className="p-2 w-[50px] text-center">#</th>
                                    <th className="p-2 w-[200px] text-center">Category Name</th>
                                    <th className="p-2 w-[300px] text-center">Description</th>
                                    <th className="p-2 w-[50px] text-center">Edit Category</th>
                                </tr>
                            </thead>
                            <tbody>

                                {categories.map(function (category: any, index: number) {
                                    return (
                                        <tr key={category.cid}>
                                            <td className="text-center p-2 bg-slate-300">{index + 1}</td>
                                            <td className="text-center p-2 bg-slate-300">{category.cname}</td>
                                            <td className="text-center p-2 bg-slate-300">{category.description}</td>
                                            <td><button type="button" className="text-center p-2 mx-2 bg-green-500 w-20 font-semibold " onClick={() => editCategories(category)}>Edit</button>
                                                <button type="button" className="text-center p-2  bg-red-700 w-20 font-semibold sm:mx-2 lg:mx-0 md:mx-2 " onClick={() => deleteCategory(category.cid)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>



                    </div>

                )
            }



        </div>
    )
}

export default Category;