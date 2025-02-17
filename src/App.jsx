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
import ProductDetails from "./pages/ProductDetails.jsx"
import GetAllProductData from "./api/GetAllProductData.jsx"
import { getProducts } from "./Redux/Actions/ProductAction.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegesterPage.jsx"
import '@ant-design/v5-patch-for-react-19';
import PageLayout from "./pages/PageLayout.jsx"
const Routes = createBrowserRouter([
  {path:"Admin", element:<AdminPanel/>,children:[
    {path:"add-products", element:<AddProducts/>},
    {path:"remove-products", element:<RemoveProducts/>},
    {path:"edit-products", element:<EditProducts/>},
    
  ]},
  {path:"/", element:<PageLayout/>},
  {path:"/products", element:<Products/>},
  {path:"productDetails/:id", element:<ProductDetails/>} ,
  {path: "register", element:<RegisterPage/>},
  {path:"login", element:<LoginPage/> }
],
// {
//   basename: "/ecommerce-react"
// }
)


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