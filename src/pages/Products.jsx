import React, { useEffect, useState } from "react";
import GetAllProductData from "../api/GetAllProductData";
import ProductCard from "../componante/ProductCard";
import { Col, Pagination, Row, Select, Spin, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/Actions/ProductAction";
import Navbar from "../componante/Navbar";
import SallaFooter from "../componante/footer";

const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.getProductsReducer.products);
  const [loading, setLoading] = useState(true);



//=================Category Filter=====================
  let filteredProducts = [...products];

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  //=================Search Query=====================

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  //=============== Clear all filters=====================
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");  
    setCurrentPage(1);       
  };

  return (
    <>
    <div style={{ padding: "20px", width: "90%" }}>
    <h1 style={{textAlign:"center",margin:"20px"}}>Navigate Through Our Products!</h1>

     
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
          {/* ==================================search and felter result =============================*/}
          <Search
            placeholder="Search products"
            enterButton="Search"
            size="large"
            loading={searchQuery!=""&&true}
            value={searchQuery}  
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: "1", minWidth: "200px", }}
          />
           <Select
            placeholder="Select Category"
            size="large"
            value={selectedCategory || undefined} 
            style={{ width: "200px", minWidth: "150px" }}
            onChange={(value) => setSelectedCategory(value)}
            allowClear
          >
            <Option value="groceries">Groceries</Option>
            <Option value="furniture">Furniture</Option>
            <Option value="fragrances">Fragrances</Option>
            <Option value="beauty">Beauty</Option>
          </Select>
          <Button type="primary" danger onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

        {/* ===========================Product From Redux =======================================*/}

        {products.length === 0 ? (
          <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
        ) : (
          <>
            {filteredProducts.length > 0 ? (
          <>
            <h2>
              {searchQuery
            ? `Search Results for "${searchQuery}"`
            : selectedCategory
            ? `Products in ${selectedCategory}`
            : "All Products"}
            </h2>
            <Row gutter={[20, 30]}>
              {paginatedProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} />
            </Col>
              ))}
            </Row>
          </>
            ) : (
          <h3>No products found.</h3>
            )}

            {/*=================================== Pagination ================================*/}
          <Pagination
            align="center"
            style={{ marginTop: "20px" }}
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length} 
            onChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
            showSizeChanger
            pageSizeOptions={["10", "20", "30"]}
          />
        </>
      )}
    </div>

 
    </>
  );
};

export default Products;
