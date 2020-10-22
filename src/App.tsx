import React, {useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./components/Main";
import Store from "./components/Store";
import Auth from "./components/authorization/Auth";
import Registration from "./components/authorization/Registration";
import Navbar from "./components/Navbar";
import {products} from "./database/products"
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import {cart} from "./database/cart";
import {ThemeContext} from "../src/components/contexts/ThemeProvider";
import {LanguageContext} from "./components/contexts/LanguageProvider";

function App() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
  return (
      <Router>
          <Navbar />
          <div>
              <button onClick={toggleLanguage}>
                  Switch to {language === 'EN' ? 'RU' : 'EN'} mode
              </button>
          </div>
          <div>
          <button onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'dark' : 'light'} mode
          </button>
          </div>
          <Switch>
              <Route exact path='/'><Main /></Route>
              <Route exact path='/store'><Store item={products}/></Route>
              <Route exact path='/auth'><Auth /></Route>
              <Route exact path='/register'><Registration /></Route>
              <Route exact path='/items/:id'><ProductDetails item={products}/></Route>
              <Route exact path='/cart'><Cart items={cart}/></Route>
          </Switch>
      </Router>

  );
}

export default App;
