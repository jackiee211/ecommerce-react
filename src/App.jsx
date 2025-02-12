import Products from "./pages/Products.jsx"
import "./index.css"
import AdminPanel from "./componante/AdminPanel.jsx"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Provider, useDispatch } from "react-redux"
import AppStore from "./Redux/store.jsx"
import { Children, useEffect } from "react"
import AddProducts from "./componante/AddProducts.jsx"
import RemoveProducts from "./componante/RemoveProducts.jsx"
import EditProducts from "./componante/EditProducts.jsx"
import '@ant-design/v5-patch-for-react-19';
import ProductDetails from "./pages/ProductDetails.jsx"
import GetAllProductData from "./api/GetAllProductData.jsx"
import { getProducts } from "./Redux/Actions/ProductAction.jsx"

const Routes = createBrowserRouter([
  {path:"/", element:<Products/>},
  {path:"Admin", element:<AdminPanel/>,children:[
    {path:"add-products", element:<AddProducts/>},
    {path:"remove-products", element:<RemoveProducts/>},
    {path:"edit-products", element:<EditProducts/>},

  ]},
  {path:"productDetails/:id", element:<ProductDetails/>}  
])


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetAllProductData();
      dispatch(getProducts(data));
      
    };
    fetchProducts();
  }, []);

  return (
    <>
    <Provider store={AppStore}>
      <RouterProvider router={Routes}>
      </RouterProvider>
    </Provider>
    </>
  )
}

export default App;
