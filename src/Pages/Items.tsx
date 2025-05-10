import { useEffect, useState } from "react";
import CategoryType from "../Types/CategoryType";
import axios from "axios";
import ItemType from "../Types/ItemType";
import { Link } from "react-router-dom";

function Items() {

    const [showImg, setImage] = useState(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [items, setItems] = useState<ItemType[]>([]);
    const [itemName, setItemName] = useState<string>("");
    const [price, setPrice] = useState<number>();

    const [editItems, setEditItems] = useState<ItemType | null>();

    async function loadCategories() {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:8080/items");
            setItems(response.data); // Set items in state
            console.log(response.data);  // Log the response data to see if items are fetched
        } catch (error: any) {
            console.error("Error fetching items:", error.message); // Log the error message
        }
    }

    async function createItem() {
        try {
            await axios.post("http://localhost:8080/items", {
                iname: itemName,
                price: price,
                categoryId: categoryId
            })
        } catch (error) {
            console.log(error);
        }

        loadItems();
    }

    async function deleteItem(itemId: number) {
        try {
            await axios.delete(`http://localhost:8080/items/${itemId}`);
            loadItems();
        } catch (error) {
            console.log(error);
        }
    }

    async function editItem(items: ItemType) {
        setEditItems(items);
        setItemName(items.iname);
        setPrice(items.price);
        setCategoryId(Number(items.category.cid));
    }

    async function updateItem() {
        try {
            await axios.put(`http://localhost:8080/items/${editItems?.ino}`, {
                iname: itemName,
                price: price,
                categoryId: categoryId
            });
            loadItems();

        } catch (error) {
            console.log(error);
        }
    }






    useEffect(() => {
        setTimeout(() => {
            setImage(false);

        }, 3000)

        loadCategories();
        loadItems();
    }, [])

    return (
        <div>
            {
                showImg ? (
                    <img src="/src/assets/R.gif" className="block mx-auto my-44 " />
                ) : (
                    <div className="container mx-auto p-5">
                        <h1 className="text-center font-semibold text-blue-700 text-7xl font-mono italic ">Items</h1>
                        <Link to="/home" className="hover:text-red-600 text-lg font-bold">Back</Link>


                        <form>
                            <div className="border-2 border-black mt-5 rounded-lg bg-gray-800  shadow-lg">
                                <p className="p-2 my-5 mx-5 text-xl font-semibold text-white">Item Name</p> <br />
                                <input type="text" className="mx-10 py-3 px-3 w-[800px] border-2 border-black rounded-lg sm:w-[300px] lg:w-[700px] max-w-[800px]" placeholder="Item Name" value={itemName} onChange={function (event) {
                                    setItemName(event.target.value);
                                }} />

                                <p className="p-2 text-xl mx-5 font-semibold text-white">Item Price</p> <br />
                                <input type="number" className="mx-10 py-3 px-3 w-[800px] border-2 mt-1 border-black rounded-lg sm:w-[300px] lg:w-[700px] max-w-[800px]" placeholder="Item Price" value={price} onChange={function (event:any) {
                                    setPrice(event.target.value);
                                }} />

                                <p className="p-2 text-xl mx-5 font-semibold text-white">Select Category</p><br />
                                <select className="mx-10 py-3 px-3 w-[800px] border-2 mt-1 border-black rounded-lg sm:w-[300px] lg:w-[700px] max-w-[800px]" value={categoryId} onChange={function (event: any) {
                                    setCategoryId(event.target.value);
                                }}>

                                    <option value={0}>Select a category</option>
                                    {
                                        categories.map(function (category: any) {
                                            return (
                                                <option value={category.cid}>{category.cname}</option>
                                            )
                                        })
                                    }

                                </select><br />

                                <div>
                                    {editItems ? (
                                        <button className="bg-green-400 w-[200px] m-10 text-xl rounded-lg p-3 hover:bg-white hover:text-black animate-bounce" onClick={updateItem}>Update Item</button>

                                    ) : <button className="bg-green-400 w-[200px] m-10 text-xl rounded-lg p-3 hover:bg-white hover:text-black animate-bounce" onClick={createItem}>Add Item</button>
                                    }
                                </div>
                            </div>


                        </form>

                        <table className="table-auto w-full mt-5 sm:w-[500px] lg:w-[1200px] md:w-[800px]">
                            <thead>
                                <tr className="bg-slate-500">
                                    <th className="p-2 w-[50px] text-center">#</th>
                                    <th className="p-2 w-[100px] text-center">Item Name</th>
                                    <th className="p-2 w-[80px] text-center">Item Price</th>
                                    <th className="p-2 w-[100px] text-center">Category</th>
                                    <th className="p-2 w-[50px] text-center">Edit Items</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    items.map(function (item, index: number) {
                                        return (
                                            <tr className="bg-slate-200">
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{index + 1}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{item.iname}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{item.price}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{item.category.cname}</td>
                                                <td ><button type="button" className="text-center p-2 mx-3 bg-green-500 w-24 font-semibold" onClick={() => editItem(item)}>Edit</button>
                                                    <button type="button" className="text-center p-2  bg-red-700 w-24 font-semibold sm:mx-3 lg:mx-0 md:mx-3" onClick={() => deleteItem(item.ino)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>


                    </div>
                )
            }

        </div>
    )
}

export default Items;