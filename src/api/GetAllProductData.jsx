import axios from "axios";

const GetAllProductData = async () => {
    try {
        const response = await axios.get("https://dummyjson.com/products");
        return response.data.products;
    } catch (error) {
        console.log("Error fetching product data:", error);
        return [];
    }
};

export default GetAllProductData;
