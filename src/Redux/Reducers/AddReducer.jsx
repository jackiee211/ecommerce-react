const initialState = {
    products: []
  };
  
  const addProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return { ...state, products: [...state.products, action.payload] };
      default:
        return state;
        case 'ADD_PRODUCT':
  console.log("Product added:", action.payload);
  return { ...state, products: [...state.products, action.payload] };
    }
  };
  
  export default addProductsReducer;