const inatialState = {
    products: [],
 
}

const productReducer = (state = inatialState, action) => {
    switch (action.type){
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'ADD_PRODUCT':
            return {
                 ...state, products: [...state.products, { id: state.products.length + 1 , ...action.payload}]
                }
        case 'DELETE_PRODUCT': 
        return {
            ...state,
            products: state.products.filter(product => product.id !== action.payload)
        };
        case "UPDATE_PRODUCT":
        return {
            ...state,
            products: state.products.map((product) =>
            product.id === action.payload.id ? { ...product, ...action.payload } : product
            ),
        };
        default:
            return state
        
    }};
    export default productReducer