import { Dispatch } from "redux";
import { Order } from "../../database/Order";

export enum OrdersActions {
  SET_ORDERS = "SET_ORDERS",
}

export const setOrders = (orders: Array<Order>) => (dispatch: Dispatch) => {
  dispatch({
    type: OrdersActions.SET_ORDERS,
    payload: orders,
  });
};
