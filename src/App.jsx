import Products from "./pages/Products.jsx"
import "./index.css"
import AdminPanel from "./componante/AdminPanel.jsx"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Provider } from "react-redux"
import AppStore from "./Redux/store.jsx"
import { Children } from "react"
import AddProducts from "./componante/AddProducts.jsx"
import RemoveProducts from "./componante/RemoveProducts.jsx"
import EditProducts from "./componante/EditProducts.jsx"
import '@ant-design/v5-patch-for-react-19';

const Routes = createBrowserRouter([
  {path:"/", element:<Products/>},
  {path:"Admin", element:<AdminPanel/>,children:[
    {path:"add-products", element:<AddProducts/>},
    {path:"remove-products", element:<RemoveProducts/>},
    {path:"edit-products", element:<EditProducts/>},

  ]}
])


function App() {
 

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
