import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CategoryType from "../Types/CategoryType";
import axios from "axios";
import ItemType from "../Types/ItemType";


function Home() {

     const [showAboutUs, setShowAboutUs] = useState(false);
     const [, setCategories] = useState<CategoryType[]>([]);
     const [, setItems] = useState<ItemType[]>([]);

     const aboutUsRef = useRef<HTMLDivElement>(null);





     function aboutUs() {
          setShowAboutUs(!showAboutUs);

     }


     useEffect(() => {
          if (showAboutUs && aboutUsRef.current) {
               aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
          }
     }, [showAboutUs]);

     async function loadCategories() {
          try {
               const response = await axios.get("http://localhost:8080/categories");
               console.log("loadCategories are : ", response);
               setCategories(response.data);

          } catch (error) {
               console.log(error);
          }

     }

     async function loadItems() {
          try {
               const response = await axios.get("http://localhost:8080/items");
               console.log("loadItems are : ", response);
               setItems(response.data);
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(function () {


          loadCategories();
          console.log(loadCategories.length);
          loadItems();


     }, [])


     return (
          <div className="container mx-auto my-10">
               <p className="border rounded-lg text-5xl pb-10 text-center font-serif font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm-w-10 lg:w-[1300px] md:w-[800px]">Axio Supermarket</p>
               <div className="w-10 h-10 lg:mx-[1200px] sm:mx-[550px] md:mx-[700px] md:my-10">
                    <Link to="/orders" className="hover:text-red-600"><img src="/src/assets/shopping cart.jpeg" className="py-4" />Shopping Cart</Link>
               </div>

               <div className="text-center ">
                    <h1 className="border px-5 py-5 w-44 rounded-lg text-center bg-green-400 font-semibold hover:bg-black hover:text-white cursor-pointer lg:inline-block mx-5 md:block md:my-2 sm:inline-flex"><Link to="/categories">Category Details <br /></Link></h1>
                    <h1 className="border px-5 py-5 w-44 rounded-lg text-center bg-green-400 font-semibold  hover:bg-black hover:text-white cursor-pointer lg:inline-block mx-5 md:block md:my-2 sm:inline-flex"><Link to="/items">Item Details <br /></Link></h1>
                    <h1 className="border px-5 py-5 w-44 rounded-lg text-center bg-green-400 font-semibold  hover:bg-black hover:text-white cursor-pointer lg:inline-block mx-5 md:block md:my-2 sm:inline-flex"><Link to="/stocks">Stock Details</Link></h1>
                    <h1 className="border px-5 py-5 w-44 rounded-lg text-center bg-green-400 font-semibold  hover:bg-black hover:text-white cursor-pointer lg:inline-block mx-5 md:block md:my-2 sm:inline-flex" onClick={aboutUs}>About Us</h1>

               </div>




               <div className="absolute top-50 right-0 animate-move-left mt-5 text-xl">
                    <p>Computers,Office & Educations | Home & Garden | Men's Clothing | Women's Clothing | Accessories | Consumer Electronics | Home Appliances</p>
               </div>


               <div className=" mt-20 ">
                    {/* <img src="/src/assets/toys.jpeg" className=" w-[300px] h-[200px] lg:inline-block px-5 sm:inline-flex md:inline-flex" alt="Toys" />
                    <img src="/src/assets/clothes.jpeg" className=" w-[300px] h-[200px] lg:inline-block px-5 sm:inline-flex md:inline-flex" alt="Clothes" />
                    <img src="/src/assets/kitchen.jpeg" className="w-[300px] h-[200px] lg:inline-block px-5 sm:inline-flex md:inline-flex" alt="Kitchen" />
                    <img src="/src/assets/electronics.jpeg" className="w-[300px] h-[200px] lg:inline-block px-5 sm:inline-flex md:inline-flex" alt="Electronics" />
                    <img src="/src/assets/fruit.jpg" className="w-[300px] h-[200px] lg:inline-block px-5 pt-4 sm:inline-flex md:inline-flex" alt="Fruit" />
                    <img src="/src/assets/milk.jpg" className="w-[300px] h-[200px] lg:inline-block px-5 pt-4 sm:inline-flex md:inline-flex" alt="Milk" />
                    <img src="/src/assets/vegitables.webp" className="w-[300px] h-[200px] lg:inline-block px-5 pt-4 sm:inline-flex md:inline-flex" alt="Vegitables" />
                    <img src="/src/assets/beltpaper.jpg" className="w-[300px] h-[200px] lg:inline-block px-5 pt-4 sm:inline-flex md:inline-flex" alt="Beltpaper" /> */}

                    <img src="/src/assets/background image.jpeg" className=" w-[1500px] h-[500px] lg:inline-block px-5 sm:inline-flex md:inline-flex" alt="Toys" />



               </div>

               {showAboutUs && (
                    <div ref={aboutUsRef} className="text-center mt-5 p-5 border bg-gray-200 rounded-lg">
                         <h2 className="text-2xl font-bold">About Axio Supermarket</h2>
                         <p>Axio Supermarket is committed to providing high-quality products across various categories. Our goal is to offer excellent service and customer satisfaction.</p>
                         <p>No.201 Homagama, Pitipana</p>
                         <p>0365897741</p>
                         <p className="font-bold">Created by : Dhanushka Sandaruwan</p>
                    </div>
               )}


          </div>
     )
}

export default Home;