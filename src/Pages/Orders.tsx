import { useEffect, useState } from "react";
import ItemType from "../Types/ItemType";
import axios from "axios";
import StockType from "../Types/StockType";
import { useNavigate } from "react-router-dom";
import { DateTime } from 'luxon';

function Orders() {

    const [showImg, setImage] = useState(true);
    const [items, setItems] = useState<ItemType[]>([]);
    const [stock, setStocks] = useState<StockType[]>([]);
    const [order, setOrder] = useState<ItemType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [cart, setCart] = useState<number>(0);
    const [model, setModel] = useState(false);
    const [date] = useState(DateTime.now());
    const [dateFormat, setDateFormat] = useState<string>("");
    const navigate = useNavigate();

    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:8082/items");
            setItems(response.data); // Set items in state
            console.log(response.data);  // Log the response data to see if items are fetched
        } catch (error: any) {
            console.error("Error fetching items:", error.message); // Log the error message
        }
    }

    const openWindow = () => setModel(true);
    const closeWindow = () => setModel(false);


    async function loadStock() {
        try {
            const response = await axios.get("http://localhost:8082/stocks");
            setStocks(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = (item: ItemType) => {
        const itemStock = stock.find((s) => s.item.ino === item.ino);
        if (itemStock && itemStock.quantity > 0) {
            const updatedStock = stock.map((s) =>
                s.item.ino === item.ino ? { ...s, quantity: s.quantity - 1 } : s
            );

            console.log("Updated Stocks", updatedStock);
            setStocks(updatedStock);

            setOrder([...order, item]);

        } else {
            alert("Item is out of stock!");
        }
    };




    async function updateStock() {
        try {

            {
                stock.map(async function (id) {
                    await axios.put(`http://localhost:8082/stocks/${id.stockId}`, {
                        quantity: id.quantity,
                        expireDate: id.expireDate,
                        item: id.item.ino
                    })
                })
            }
            console.log("Stock are ", stock);


            navigate("/stocks");
            refreshPage();


        } catch (error) {
            console.log(error);
        }
    }

    function refreshPage() {
        window.location.reload();
    }




    useEffect(() => {
        setTimeout(() => {
            setImage(false);

        }, 3000)

        loadItems();
        loadStock();
    }, [])

    useEffect(() => {
        setDateFormat(date.toFormat('yyyy-MM-dd HH:mm:ss'));
    }, [Date])

    useEffect(() => {
        const totalPrice = order.reduce((sum, Item) => sum + Item.price, 0);
        setTotal(totalPrice);
        const count = order.reduce((Count) => Count + 1, 0);
        setCart(count);



    }, [order])




    return (
        <div className="container mx-auto my-5">
            {
                showImg ? (
                    <img src="/src/assets/R.gif" className="block mx-auto my-44" />
                ) : (

                    <div className="container mx-auto my-auto">
                        <div>
                            <h1 className="text-blue-700 font-bold sm:text-center text-5xl font-mono italic">Item List</h1>

                            <div className="w-10 h-10 my-5 lg:mx-[1200px] sm:mx-[400px]">

                                <p className="mx-8 border text-red-600">{cart}</p>
                                <img src="/src/assets/shopping cart.jpeg" />

                            </div>

                            {
                                items.map(function (Item: ItemType) {

                                    const itemStock = stock.find(stock => stock.item.ino === Item.ino);
                                    return (
                                        <ul className="border-2 border-black my-3 mx-3 w-[400px] p-3 rounded-lg bg-green-400 font-bold text-center lg:inline-flex cursor-pointer md:inline-flex sm:inline-flex" onClick={() => addToCart(Item)}>
                                            <li className="text-blue-700 p-2">{Item.iname}</li>
                                            <li className="text-red-600 p-2">Rs. {Item.price}.00</li>
                                            <li className="text-black p-2">{Item.category.cname} Category</li>
                                            <li className="text-black p-2">Quantity  {itemStock ? itemStock.quantity : "Out of Stock"}</li>
                                        </ul>



                                    )
                                })


                            }

                            <div className="p-2">
                                <div className="text-xl text-slate-800 font-semibold mb-5 sm:text-center">New Order</div>
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr className="bg-slate-200 text-sm text-slate-600 font-bold">
                                            <th className="p-2 w-[50px] text-left">#</th>
                                            <th className="p-2 w-[200px] text-left">Item</th>
                                            <th className="p-2 w-[100px] text-left">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((Item, index) => (
                                            <tr key={Item.ino}>
                                                <td className="p-2 text-slate-600 border-b border-slate-200 font-semibold">{index + 1}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200 font-semibold">{Item.iname}</td>
                                                <td className="p-2 text-slate-600 border-b border-slate-200 font-semibold">Rs. {Item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Total Price */}
                                <div className="text-right text-lg font-semibold mt-4 text-red-500">
                                    Total: Rs. {total}
                                </div>
                                <button className="text-xl font-semibold bg-black text-white p-3 rounded-lg  mx-3" onClick={openWindow}>Checkout</button>
                                <button className="text-xl font-semibold bg-red-600 text-white p-3 rounded-lg" onClick={refreshPage}>Delete Orders</button>

                                {model && (
                                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                        <div className="bg-white p-8 rounded-lg ">
                                            <h1 className="text-3xl font-semibold mb-3 text-blue-700 text-center">Axio Supermarket</h1>

                                            <h2 className="text-xl font-semibold mb-4 text-red-700">Confirm your orders</h2>
                                            {/* print bill */}

                                            <div className="max-h-64 overflow-y-auto">
                                                <table className="table-auto mx-5">
                                                    <thead>
                                                        <tr>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {order.map(function (OrderItem, index: number) {
                                                            return (
                                                                <div>
                                                                    <tr>
                                                                        <td className="p-2 w-[50px] font-semibold">{++index}</td>
                                                                        <td className="p-2 w-[150px] font-semibold">{OrderItem.iname}</td>
                                                                        <td className="p-2 w-[50px] font-semibold">Rs.{OrderItem.price}</td>
                                                                    </tr>



                                                                </div>

                                                            )
                                                        })}

                                                        <div className="text-xl mt-4 font-bold text-blue-600">Total Price : Rs.{total}</div>
                                                        <div className="font-bold ">{dateFormat}</div>
                                                    </tbody>

                                                </table>

                                            </div>

                                            <button onClick={updateStock} className="bg-green-500 text-white px-4 py-2 rounded mt-4 mx-5">
                                                Place Order
                                            </button>
                                            <button onClick={closeWindow} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                                                Close
                                            </button>


                                        </div>
                                    </div>
                                )}
                            </div>



                        </div>




                    </div>

                )
            }
        </div>
    )
}

export default Orders;