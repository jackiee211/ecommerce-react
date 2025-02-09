import React,{useEffect,useState} from "react";

import GetAllProductData  from "../api/GetAllProductData";
import  ProductCard from "../componante/ProductCard"
import { Pagination } from "antd";
import { Input } from 'antd';

const { Search } = Input;
const Products = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
          const data = await GetAllProductData();
          setProducts(data); // Update state with fetched data
   
        };
        fetchProducts();
      }, []);
      return (
        <>
           <Search placeholder="input search text" enterButton="Search" size="large"  />
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: 0, listStyle: "none" }}>
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <Pagination align="center" defaultCurrent={1} total={50} />
        </>
      );
};export default Products;