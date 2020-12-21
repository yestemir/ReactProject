import React, {ReactElement, Fragment, useState} from "react";
import { Order } from "../database/Order";
import { connect } from "react-redux";
import "./orders.css";

interface Props {
  orders: Order[];
}

function Orders({ orders }: Props): ReactElement {
  const [sum, setSum] = useState(0)

  return (
      <div className="list">
        <div className="heading">
          <h4 id="ordTitle">Order List</h4>
          <i className="fas fa-ellipsis-h" />
        </div>
        <div className="main">
          <table>
            <tr>
              <th>Number</th>
              <th>Image</th>
              <th id='menu'>Menu</th>
              <th>Cook's Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Phone</th>
            </tr>
            {orders.map((item, i) => (
            <Fragment key={i}>
              {item.products.map((product, i) => (
                  <tr className="items" key={i}>
                    <td className="invoice">{i}</td>
                    <td className="image" id='tdimg' ><img id="inag" className="image" src={product.image} /></td>
                    <td className="menu" id="name">{product.name}</td>
                    <td className="customer">{product.brand}</td>
                    <td className="quantity">1</td>
                    <td className="amount">{product.price}</td>
                    <td className="status" ><button id="sts">Confirmed</button></td>
                    <td className="phone">+00000000</td>
                    {/*<span id="sp"></span>*/}
                  </tr>
              ))}
            </Fragment>
            ))}
          </table>

        </div>
        <div className="bottom">
          <div className="showing">
            <span>Bon appetite💋</span>
          </div>
          <div className="number">
            <span>Previous</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>Next</span>
          </div>
        </div>
      </div>
  );
  // return (
  //   <div>
  //     {orders.map((item, index) => (
  //       <div className="order" key={index}>
  //         <div className="order__products">
  //           {item.products.map((product, i) => (
  //             <div className="order__product" key={i}>
  //               {product.name}
  //             </div>
  //           ))}
  //         </div>
  //         <div className="order__info">Grand Total: {item.grantTotal}</div>
  //         <div className="order__info">Tax: {item.tax}</div>
  //         <div className="order__info">Delivery: {item.delivery}</div>
  //         <div className="order__info">Date: {item.orderDate.toDateString()}</div>
  //       </div>
  //     ))}
  //   </div>
  // );
}

function mapStateToProps(state: any) {
  return {
    orders: state.orders.orders,
  };
}

export default connect(mapStateToProps, {})(Orders);
