import React,{useEffect,useState} from "react";
import GetAllProductData  from "../api/GetAllProductData";
import  ProductCard from "../componante/ProductCard"
import { Col, Pagination, Row, Spin } from "antd";
import { Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/Actions/ProductAction";
import Navbar from "../componante/Navbar";

const { Search } = Input;
const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesSize, setPageSize] = useState(10);

  const despatch =useDispatch();
  const products = useSelector((state) => state.getProductsReducer.products);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
          const data = await GetAllProductData();
       
          despatch(getProducts(data));
          setLoading(false);

   
        };
        fetchProducts();
      }, []);
      const startIndex = (currentPage - 1) * pagesSize;
      const paginatedProducts = products.slice(startIndex, startIndex + pagesSize);
      return (
        <>
          <Navbar/>
          <div style={{ padding: "20px" ,margin:"auto",width:"90%"}}>
             <Search 
             placeholder="input search text" 
             enterButton="Search" 
             size="large" 
             style={{ marginBottom: "30px", width: "100%",marginTop:"50px" }} 
             />
             {
              loading?(
                <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
              ): (
                <>
                <Row gutter={[20,30]}>
  
                  {
                    paginatedProducts.length > 0 ?
                (    paginatedProducts.map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <ProductCard product={product} />
                      </Col>
                    ))):(
                      <h1>No Products Found</h1>
                    )
                  }
                </Row>
                </>
              )
             
             }
       
            <Pagination align="center" style={{ marginTop: "20px" }}
            current={currentPage}
            pageSize={pagesSize}
  
            total={products.length}
            onChange={(page,size)=>{
            setCurrentPage(page);
             setPageSize(size);
            }}
            showSizeChanger
            pageSizeOptions={["10", "20", "30"]}
            />
          </div>
        </>
      );
};export default Products;