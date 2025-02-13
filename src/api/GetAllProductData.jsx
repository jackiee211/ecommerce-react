import axios from "axios";

const GetAllProductData = async () => {
    try {
<<<<<<< HEAD
        const response = await axios.get("https://dummyjson.com/products?limit=20");
        return response.data.products; // Ensure it returns the correct array
    } catch (error) {
        console.log("Error fetching product data:", error);
        return []; // Return an empty array to avoid errors in mapping
=======
        const response = await axios.get("https://dummyjson.com/products");
        return response.data.products;
    } catch (error) {
        console.log("Error fetching product data:", error);
        return [];
>>>>>>> main
    }
};

export default GetAllProductData;
