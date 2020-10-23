import React, {useState, useEffect, useContext} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect, BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Store from "./components/Store";
import Auth from "./components/authorization/Auth";
import Registration from "./components/authorization/Registration";
import Navbar from "./components/Navbar";
// import Profile from "./components/Profile"
import { products } from "./database/products";
import { User } from "./database/User";
import Cart from "./components/Cart";
import {cart} from "./database/cart";
import ProductDetails from "./components/ProductDetails";
import {Product} from "./database/Product";
import Profile from "./components/Profile";

const defUser = () => {
    return {
        id: 1,
        name: "asd",
        email: "asd@asd.asd",
        password: "asd",
        basket: [],
    };
}

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState<User>(defUser);
    return (
                <Router>
                    <Navbar status={isLoggedIn} curUser={loggedUser} logout={logout} login={login}/>

                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route exact path="/store">
                            <Store item={products} addItem={addItemToBasket}/>
                        </Route>
                        <Route exact path="/cart">
                             <Cart user={loggedUser} removeItem={removeItemFromBasket}/>
                            {() => <h1>CRS world</h1>}
                        </Route>
                        <Route
                            exact
                            path="/auth"
                            component={() => <Auth login={authenticateUser} cancel={show} />}
                            >
                        </Route>
                        <Route exact path="/register">
                            <Registration registrate={createNewUser} cancel={show} />
                        </Route>
                        <Route exact path="/main">
                            <Main />
                        </Route>
                        <Route exact path="/profile">
                            <Profile curUser={loggedUser} />
                        </Route>
                        <Route exact path="/items/:id">
                            {() => <h1>Product Detail</h1>}
                             <ProductDetails item={products}/>
                        </Route>
                    </Switch>
                </Router>
    );

    function createNewUser(user: User) {
        const checker = users.find((u) => u.email === user.email);
        if (checker) {
            return false;
        }
        user.id = users.length + 1;
        setUsers((users) => [...users, user]);
        console.log(users);
        return true;
    }

    function authenticateUser(user: User) {
        const checker = users.find((u) => u.email === user.email && u.password == user.password);
        if (!checker) {
            return false;
        }
        user = checker;
        setIsLoggedIn(true);
        setLoggedUser(user);
        console.log(loggedUser);
        console.log(isLoggedIn);
        return true;
    }

    function logout() {
        setIsLoggedIn(false);
    }

    function login() {
        setIsLoggedIn(true);
    }

    function show() {
        return <Redirect to="/" />;
    }

    function addItemToBasket(product: Product) {
        product.id = loggedUser.basket.length + 1;
        loggedUser.basket.push(product);
    }

    function removeItemFromBasket(id: number) {
        loggedUser.basket = loggedUser.basket.filter((item, index) => {
            return id !== index;
        })
    }
}

export default App;




// import React, {useContext} from 'react';
// import './App.css';
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import Main from "./components/Main";
// import Store from "./components/Store";
// import Auth from "./components/authorization/Auth";
// import Registration from "./components/authorization/Registration";
// import Navbar from "./components/Navbar";
// import {products} from "./database/products"
// import ProductDetails from "./components/ProductDetails";
// import Cart from "./components/Cart";
// import {cart} from "./database/cart";
// import {ThemeContext} from "../src/components/contexts/ThemeProvider";
// import {LanguageContext} from "./components/contexts/LanguageProvider";
//
// function App() {
//     const { theme, toggleTheme } = useContext(ThemeContext);
//     const { language, toggleLanguage } = useContext(LanguageContext);
//   return (
//       <Router>
//           <Navbar />
//           <div>
//               <button onClick={toggleLanguage}>
//                   Switch to {language === 'EN' ? 'RU' : 'EN'} mode
//               </button>
//           </div>
//           <div>
//           <button onClick={toggleTheme}>
//               Switch to {theme === 'light' ? 'dark' : 'light'} mode
//           </button>
//           </div>
//           <Switch>
//               <Route exact path='/'><Main /></Route>
//               <Route exact path='/store'><Store item={products}/></Route>
//               <Route exact path='/auth'><Auth /></Route>
//               <Route exact path='/register'><Registration /></Route>
//               <Route exact path='/items/:id'><ProductDetails item={products}/></Route>
//               <Route exact path='/cart'><Cart items={cart}/></Route>
//           </Switch>
//       </Router>
//
//   );
// }
//
// export default App;
