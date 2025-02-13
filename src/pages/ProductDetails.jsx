
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import ProductDetailsCard from "../componante/ProductDetailsCard";
function ProductDetails(){
const {id} = useParams();
const product = useSelector((state) => state.getProductsReducer.products.find((product) => product.id == Number(id)));


    return(
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px",  }}>
        {
            product == undefined ? <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
            :
           <ProductDetailsCard product={product} />
            }
        </div>
    )

}export default ProductDetails;