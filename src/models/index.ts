import OrderModel from "./order.model";
import ProductModel from "./product.model";
import CustomerModel from "./customer.model";

const DB = {
    Customer: CustomerModel,
    Order: OrderModel,
    Product: ProductModel
};

export default DB;
