import ItemType from "./ItemType";

interface Stock{
    stockId:number,
    quantity:number,
    expireDate:string,
    item:ItemType
}

export default Stock;