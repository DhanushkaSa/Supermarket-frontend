import CategoryType from "./CategoryType";

interface ItemType {
   

    ino: number;
    iname: string;
    price: number;
    category: CategoryType;
    quantityOrdered?: any;
}



export default ItemType;