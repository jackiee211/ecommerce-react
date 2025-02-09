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
        default:
            return state
    }};export default productReducer