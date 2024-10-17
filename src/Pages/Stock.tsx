import { useEffect, useState } from "react";
import StockType from "../Types/StockType";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemType from "../Types/ItemType";

function Stock() {

    const [showImg, setImage] = useState(true);
    const [stocks,setStocks]=useState<StockType[]>([]);
    const[items,setItems]=useState<ItemType[]>([]);
    const [itemId,setItemId]=useState<number>(0);
    const[date,setDate]=useState<string>("");
    const[count,setCount]=useState<number>(0);
    
    const[edit,setEditStock]=useState<StockType | null>();

    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:8082/items");
            setItems(response.data); // Set items in state
            console.log(response.data);  // Log the response data to see if items are fetched
        } catch (error: any) {
            console.error("Error fetching items:", error.message); // Log the error message
        }
    }

    async function createStock() {
        try {
            await axios.post("http://localhost:8082/stocks", {
                quantity: count,
                expireDate: date,
                item: itemId
            })
        } catch (error) {
            console.log(error);
        }

        loadStock();
    }

    async function loadStock(){
        try {
            const response=await axios.get("http://localhost:8082/stocks");
            setStocks(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateStock(){
        try {
            await axios.put(`http://localhost:8082/stocks/${edit?.stockId}`,{
                quantity: count,
                expireDate: date,
                item: itemId
            })
        } catch (error) {
            console.log(error);
        }

        loadStock();
    }

    async function editStock(stock: StockType) {
        setEditStock(stock);
        setCount(stock.quantity);
        setDate(stock.expireDate);
        setItemId(Number(stock.item.ino));
    }

    useEffect(() => {
        setTimeout(() => {
            setImage(false);

        }, 3000)

        loadStock();
        loadItems();


    }, [])

    return (
        <div>

            {
                showImg ? (
                    <img src="/src/assets/R.gif" className="block mx-auto my-44 " />
                ) : (
                    <div className="container mx-auto p-5">
                        <h1 className="text-center font-semibold text-blue-700 text-7xl font-mono italic md:m-5">Stock Information</h1>
                        <Link to="/" className="hover:text-red-600 text-lg font-bold">Back</Link>

                        <form>
                            <div className="border-2 border-black mt-5 rounded-lg bg-gray-800  shadow-lg">
                            <p className="p-2 text-xl mx-5 font-semibold text-white">Select Item</p><br />

                            <select className="mx-10 py-3 px-3 w-[800px] border-2 mt-1 border-black rounded-lg  sm:w-[300px] lg:w-[700px] max-w-[800px]" value={itemId} onChange={function (event: any) {
                                    setItemId(event.target.value);
                                }}>

                                    <option value={0}>Select a Item</option>
                                    {
                                        items.map(function (item: any) {
                                            return (
                                                <option value={item.ino}>{item.iname}</option>
                                            )
                                        })
                                    }

                                </select><br />

                                <p className="p-2 my-5 mx-5 text-xl font-semibold text-white">Item Quantity</p> <br />
                                <input type="number" className="mx-10 py-3 px-3 w-[800px] border-2 border-black rounded-lg  sm:w-[300px] lg:w-[700px] max-w-[800px]" placeholder="Item Count" value={count} onChange={function (event:any) {
                                    setCount(event.target.value);
                                }} />

                                <p className="p-2 text-xl mx-5 font-semibold text-white">Expire Date</p> <br />
                                <input type="Date" className="mx-10 py-3 px-3 w-[800px] border-2 mt-1 border-black rounded-lg  sm:w-[300px] lg:w-[700px] max-w-[800px]" placeholder="Item Price" value={date} onChange={function (event:any) {
                                    setDate(event.target.value);
                                }} />

                                
                                

                                <div>
                                    {edit ? (
                                        <button className="bg-green-400 w-[200px] m-10 text-xl rounded-lg p-3 hover:bg-white hover:text-black animate-bounce font-semibold" onClick={updateStock}>Update Stock</button>

                                    ) : <button className="bg-green-400 w-[200px] m-10 text-xl rounded-lg p-3 hover:bg-white hover:text-black animate-bounce font-semibold" onClick={createStock}>Add Stock</button>
                                    }
                                </div>
                            </div>


                        </form>

                        <table className="table-auto w-full mt-5">
                            <thead>
                                <tr className="bg-slate-500">
                                    <th className="p-2 w-[50px] text-center">#</th>
                                    <th className="p-2 w-[100px] text-center">Item Name</th>
                                    <th className="p-2 w-[80px] text-center">Quantity</th>
                                    <th className="p-2 w-[100px] text-center">Expire Date</th>
                                    <th className="p-2 w-10 text-center">Edit Stock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    stocks.map(function (stock, index: number) {
                                        return (
                                            <tr className="bg-slate-200">
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{index + 1}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{stock.item.iname}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{stock.quantity}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200">{stock.expireDate}</td>
                                                <td ><button type="button" className="text-center p-2 mx-3 bg-green-500 w-24 font-semibold" onClick={() => editStock(stock)}>Edit</button>
                                                    {/* <button type="button" className="text-center p-2  bg-red-700 w-24 font-semibold" onClick={() => deleteItem(item.ino)}>Delete</button> */}
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

export default Stock;