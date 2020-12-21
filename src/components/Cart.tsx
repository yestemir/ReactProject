import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import logProps from "../shared/PropsLogger";
import { User } from "../database/User";
import "./cart.css";
import { Product } from "../database/Product";
import { connect } from "react-redux";
import { setOrders } from "../store/actions/orders.actions";
import { Order } from "../database/Order";
interface Props {
  user: User | null;
  removeItem: (index: number) => void;
  clearBasket: () => void;
  orders: Array<Order>;
  setOrders: (orders: Order[]) => void;
}

function Cart({
  user,
  removeItem,
  orders,
  setOrders,
  clearBasket,
}: Props): ReactElement {
  // const [items, setItems] = useState(user?.basket);
  const [total, setTotal] = useState(0);
  const totalRef = useRef(null);

  const remove = React.useCallback(
    (id) => {
      return removeItem(id);
    },
    [user?.basket]
  );

  useEffect(() => {
    calculateTotal();
  }, [user]);

  const memoizedTotal = React.useMemo(() => calculateTotal(), [total]);

  function calculateTotal() {
    let totalVal = user
      ? user.basket.reduce((sum, it) => sum + it.price, 0)
      : 0;
    if (totalRef.current) {
      const ref = totalRef as any;
      ref.current.innerText = `${totalVal}`;
    }
    setTotal((prevState) => totalVal);
    return totalVal;
  }

  const basket = user ? user.basket : [];
  const shipping = 0.05;
  const delivery = total > 0 ? 15 : 0;

  const handleCheckout = () => {
    if (basket && basket.length) {
      const newOrder: Order = {
        orderDate: new Date(),
        grantTotal: memoizedTotal + memoizedTotal * shipping + delivery,
        delivery: delivery,
        products: basket,
        tax: memoizedTotal * shipping,
      };

      setOrders([...orders, newOrder]);
      clearBasket();
    }
  };

  return (
    <React.Fragment>
      <h1 id="title">Shopping Cart</h1>
      <div className="shopping-cart" id="strt">
        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Product</label>
          <label className="product-price">Price</label>
          <label className="product-quantity">Quantity</label>
          <label className="product-removal">Remove</label>
          <label className="product-line-price">Total</label>
        </div>

        <div>
          {basket.map((item, index) => (
            <div key={index} className="product">
              {/*<div id="product-image">*/}
              {/*    <img src={item.image}>*/}
              <div className="product-image">
                <img id="product-image" src={item.image} />
              </div>
              <div className="product-details">
                <Link to={"/items/" + item.id}>
                  {" "}
                  <div className="product-title">{item.name}</div>
                </Link>
                <p className="product-description">{item.description}</p>
              </div>
              <div className="product-price">{item.price}</div>
              <div className="product-quantity">
                {/*<input type="number" value="1" min="0" onChange={(e) =>*/}
                {/*    parseInt(e.target.value)}/>*/}
                <p>1</p>
              </div>
              <div className="product-removal">
                <button
                  className="remove-product"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
              <div className="product-line-price">{item.price}</div>
              {/*<button onClick={() => removeItem(index)}>Delete</button>*/}
            </div>
          ))}
        </div>

        <div className="totals">
          <div className="totals-item">
            <label>Subtotal</label>
            <div className="totals-value" id="cart-subtotal">
              {memoizedTotal}
            </div>
          </div>
          <div className="totals-item">
            <label>Tax (5%)</label>
            <div className="totals-value" id="cart-tax">
              {memoizedTotal * shipping}
            </div>
          </div>
          <div className="totals-item">
            <label>Delivery</label>
            <div className="totals-value" id="cart-shipping">
              {delivery}
            </div>
          </div>
          <div className="totals-item totals-item-total">
            <label>Grand Total</label>
            <div className="totals-value" id="cart-total">
              {memoizedTotal + memoizedTotal * shipping + delivery}
            </div>
          </div>
        </div>

        <button className="checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </React.Fragment>
  );
}

// function mapStateToProps(state: any) {
//   return {
//     orders: state.orders.orders,
//   };
// }

// export default connect(mapStateToProps, { setOrders })(
//   logProps(Cart as React.FunctionComponent)
// );

export default logProps(Cart as React.FunctionComponent)

// <>
//   <section id="store" className="store py-5">
//   <div className="container">
//   <div>
//     {basket.map((item, index) => (
//       <div key={index} >
//         {/*<div id="product-image">*/}
//         {/*    <img src={item.image}>*/}
//           <div>
//               <img id="product-image" src={item.image} />
//           </div>
//         <Link to={'/items/' + item.id}>
//           {' '}
//           <div className="cartListItemName">{item.name}</div>
//         </Link>
//           <div className="description">
//               <span>{item.description}</span>
//           </div>
//         <div className="cartListItemPrice">{item.price}</div>
//         {/*<button onClick={() => removeItem(index)}>Delete</button>*/}
//       </div>
//     ))}
//   </div>
//     {/*<div>Total: ${cartTotal}</div>*/}
//     {basket.length > 0 && (
//       <div className="cart-total">
//         <h5 ref={totalRef}></h5>
//         <button className="addToCart"> Order</button>
//       </div>
//     )}
//   </div>
//   </section>
// </>

// const total = () => {
//   let totalVal = user
//     ? user.basket.reduce((sum, it) => sum + it.price, 0)
//     : 0;
//   if (totalRef.current) {
//     const ref = totalRef as any;
//     ref.current.innerText = `${totalVal}`;
//   }
//   return totalVal;
// };

// function removeItemFromBasket(id: number) {
//     if (user) {
//         const basket = user.basket.filter((item, index) => {
//             return id !== index;
//         });
//
//         // setLoggedUser({...loggedUser, basket});
//     }
// }

//   const removeFromCart = (el: Product) => {
//     let hardCopy = [...items];
//     hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
//     setItems(hardCopy);
//   };
