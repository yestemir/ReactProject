import React, {ReactElement, useContext} from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { User } from '../database/User';
import {ThemeContext} from "./contexts/ThemeProvider";
import {LanguageContext} from "./contexts/LanguageProvider";
import './navbar.css';

interface Props {
    curUser: User | null;
    logout: () => void;
}

export default function Navbar({curUser, logout}: Props): ReactElement {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);

    // const showCart = (user : User | null) => {
    //     if (user) {
    //         return <span>
    //             <Link to='/cart'>Cart</Link>
    //         </span>
    //     }
    //     return <>asd</>;
    // }

    // const showLogout = (user : User | null) => {
    //     if (user) {
    //         return <span onClick={() => logout()}>
    //             Logout
    //         </span>
    //     }
    //     return <>asd</>;
    // }

    const showProfile = (user: User | null) => {
        if (user) {
            return(
            <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                {/*<span className="cart-info__icon mr-lg-3">*/}
                <span>
                        <Link to='/profile'>Profile</Link>
                    </span>
            </div>
            );
        }
        return <></>;
    }

    const showLogin = (user: User | null) => {
        if (!user) {
            return <span>
                <Link to='/auth'>Login</Link>
            </span>
        }
        return <span>
                <Link to='/cart'>Cart</Link>
            </span>
    }

    const showReg = (user: User | null) => {
        if (!user) {
            return <span>
                <Link to='/register'>Register</Link>
            </span>
        }
        return <span onClick={() => logout()}>
                Logout
            </span>
    }

    return (
        <nav className="navbar navbar-expand-lg px-4 sticky" id="nav">
        <div className='container'>
            <div className="collapse navbar-collapse navbar-nav mx-auto text-capitalize" id="myNav">
                <a className="navbar-brand" href="#"><img src="img/logo.svg" alt="" /></a>
                <Link to='/store' className="nav-item active nav-link"> Store </Link>
                <Link to='/main' className="nav-item active nav-link"> Home </Link>
            </div>

            <div className="nav-info-items d-none d-lg-flex ">
                <div className="nav-info align-items-center d-flex justify-content-between mx-lg-5">
                    {/*<span className="info-icon mx-lg-3">*/}
                    {/*<p className="mb-0">+7777-777-77-77</p>*/}
                    {/*    </span>*/}
                </div>
            </div>

            <div className="navbar-nav text-capitalize">
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    {/*<span className="cart-info__icon mr-lg-3">*/}
                    <span>
                        {showLogin(curUser)}
                    </span>
                </div>
                {showProfile(curUser)}
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    {/*<span className="cart-info__icon mr-lg-3">*/}
                    <span>
                        {showReg(curUser)}
                    </span>
                </div>
                {/*<div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between*/}
                {/*border-0">*/}
                {/*    {showCart(curUser)}*/}
                {/*</div>*/}
                {/*<div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between*/}
                {/*border-0">*/}
                {/*    {showLogout(curUser)}*/}
                {/*</div>*/}

                    <div id="oncl" onClick={toggleLanguage}>
                        {language === 'EN' ? 'RU' : 'EN'}
                    </div>
                    <div id="oncl" onClick={toggleTheme} className="cart-info__icon mr-lg-3">
                        {theme === 'light' ? 'dark' : 'light'}
                    </div>
            </div>
        </div>
        </nav>
    )
}