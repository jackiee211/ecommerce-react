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
                };
        default:
            return state
        
    }};
    export default productReducer