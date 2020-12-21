import { combineReducers } from "redux";
import commentsReducer from "./comments.reducer";
import ordersReducer from './orders.reducer';


const rootReducer = combineReducers({
    orders: ordersReducer,
    comments: commentsReducer
});

export default rootReducer;