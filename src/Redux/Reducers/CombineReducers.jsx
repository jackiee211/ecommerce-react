import { combineReducers } from 'redux';

import productReducer from './productReducer';
import addProductsReducer from './AddReducer';
export default  combineReducers(

    {
        getProductsReducer: productReducer,
        addProductsReducer,
        
   
    }
);
