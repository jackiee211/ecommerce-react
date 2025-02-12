export const getProducts =(products)=>{
    return {
        type: 'GET_PRODUCTS',
        payload: products
    }
};