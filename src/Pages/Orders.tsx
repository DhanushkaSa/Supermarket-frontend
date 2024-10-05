import { useEffect, useState } from "react";

function Orders() {

    const [showImg, setImage] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setImage(false);

        }, 3000)
    }, [])
    return (
        <div>
             {
                showImg ? (
                    <img src="/src/assets/R.gif" className="block mx-auto" />
                ) : (

                    <div>
                        <h1>Orders</h1>
                    </div>

                )
            }
        </div>
    )
}

export default Orders;