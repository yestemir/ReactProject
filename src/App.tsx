import React, { useState, Profiler, useCallback, lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { products } from "./database/products";
import { User } from "./database/User";
import { Product } from "./database/Product";
import { ThemeContext, LanguageContext } from "./context";
import { darkTheme, lightTheme } from "./theme";

const user: User = {
  id: 1,
  name: 'asdf',
  email: 'asd@asd.asd',
  password: 'asdasd',
  basket: []
};

const Store = lazy(() => import("./components/Store"));
const Cart = lazy(() => import("./components/Cart"));
const Auth = lazy(() => import("./components/authorization/Auth"));
const Registration = lazy(() => import("./components/authorization/Registration"));
const Main = lazy(() => import("./components/Main"));
const Profile = lazy(() => import("./components/Profile"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));

function App() {
  const [users, setUsers] = useState<User[]>([user]);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const callbackFunction = (
      id: string,
      phase: "mount" | "update",
      actualDuration: number,
      baseDuration: number,
      startTime: number,
      commitTime: number,
      interactions: Set<{ id: number; name: string; timestamp: number }>
  ) => {
    console.log("Id is :", id);
    console.log("Phase is :", phase);
    console.log("Actual Duration is :", actualDuration);
    console.log("Base Duration is :", baseDuration);
    console.log("Start Time is :", startTime);
    console.log("Commit Time is :", commitTime);
    console.log("Interactions is :", interactions);
  };

  return (
    <ThemeContext.Provider value={lightTheme}>
      <LanguageContext.Provider value="EN">
        <Router>
          <Navbar curUser={loggedUser} logout={logout} />
          <Suspense fallback={<h1>Loading Route ...</h1>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/main"/>
            </Route>
            {/*<Route path="/store" exact component={Store} />*/}
            <Route exact path="/store">
              <ErrorBoundary>
              <Store item={products} addItem={addItemToBasket} />
              </ErrorBoundary>
            </Route>
            {/*<Route path="/cart" exact component={Cart} />*/}
            <Route exact path="/cart">
              <Profiler id="Cart" onRender={callbackFunction}>
                <Cart user={loggedUser} removeItem={removeItemFromBasket} />
                {/*<Cart user={loggedUser} />*/}
              </Profiler>
            </Route>
            {/*<Route path="/auth" exact component={Auth} />*/}
            <Route
              exact
              path="/auth">
              <Auth login={authenticateUser} cancel={show} />
            </Route>
            {/*<Route path="/register" exact component={Registration} />*/}
            <Route exact path="/register">
              <Registration registrate={createNewUser} cancel={show} />
            </Route>
            {/*<Route path="/main" exact component={Main} />*/}
            <Route exact path="/main">
              <Main />
            </Route>
            {/*<Route path="/profile" exact component={Profile}  />*/}
            <Route exact path="/profile">
              <Profile curUser={loggedUser} />
            </Route>
            {/*<Route path="/items/:id" exact component={ProductDetails} />*/}
            <Route exact path="/items/:id">
              <ErrorBoundary>
                <ProductDetails item={products} addItem={addItemToBasket}/>
              </ErrorBoundary>
            </Route>
          </Switch>
          </Suspense>
        </Router>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
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
    const checker = users.find(
      (u) => u.email === user.email && u.password == user.password
    );
    if (!checker) {
      return false;
    }
    user = checker;
    user.basket = [];
    setLoggedUser(user);
    console.log(loggedUser);
    return true;
  }

  function logout() {
    setLoggedUser(null);
  }

  function show() {
    return <Redirect to="/" />;
  }

  function addItemToBasket(product: Product) {
    if (loggedUser) {
      product.id = loggedUser.basket.length + 1;
      loggedUser.basket.push(product);
    }else{
      throw new Error("You are not logged in");
    }
  }

  function removeItemFromBasket(id: number) {
    if (loggedUser) {
      console.log('Updated');
      const basket = loggedUser.basket.filter((item, index) => {
        return id !== index;
      });

      setLoggedUser({...loggedUser, basket});
    }
  }
}

export default App;
