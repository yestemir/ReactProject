import React, {ReactElement, useContext} from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { User } from '../database/User';
import {ThemeContext} from "./contexts/ThemeProvider";
import {LanguageContext} from "./contexts/LanguageProvider";

interface Props {
    status: boolean;
    curUser: User;
    logout: () => void;
    login: () => void;
}

export default function Navbar({status, curUser, logout, login}: Props): ReactElement {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);

    const showCart = (stat: boolean) => {
        if (stat) {
            return (<span>
                <Link to='/cart'>Cart</Link>
            </span>)
        }
    }
    const showLogout = (stat: boolean) => {
        if (stat) {
            return <span onClick={() => logout()}>
                Logout
            </span>
        }
    }

    const showLogin = (stat: boolean) => {
        if (!stat) {
            return <span>
                <Link to='/auth'> Login </Link>
            </span>
        }
    }

    const showReg = (stat: boolean) => {
        if (!stat) {
            return <span>
                <Link to='/register'> Register </Link>
            </span>
        }
    }

    return (
        <nav className="navbar navbar-expand-lg px-4 sticky ">
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
                    <span className="cart-info__icon mr-lg-3">
                        {showLogin(status)}
                    </span>
                </div>
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    <span className="cart-info__icon mr-lg-3">
                        {showReg(status)}
                    </span>
                </div>
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    {showCart(status)}
                </div>
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    {showLogout(status)}
                </div>

                    <div onClick={toggleLanguage} style={{
                        // border: "2px solid black", borderRadius: "5px",
                        border: "0",
                        backgroundColor: "white",
                        // borderColor: "#4CAF50",
                        color: "green",
                        padding: "14px 28px",
                        fontSize: "16px",
                        width: "10%",
                        textAlign: "center",
                        margin: "5px",
                        cursor: "pointer"}}>
                        {language === 'EN' ? 'RU' : 'EN'}
                    </div>
                    <div onClick={toggleTheme} className="cart-info__icon mr-lg-3" style={{
                                // border: "2px solid black", borderRadius: "5px",
                                border: "0",
                                backgroundColor: "white",
                                // borderColor: "#4CAF50",
                                color: "green",
                                padding: "14px 28px",
                                fontSize: "16px",
                                width: "10%",
                                textAlign: "center",
                                margin: "5px",
                                cursor: "pointer"}}>
                        {theme === 'light' ? 'dark' : 'light'}
                    </div>
            </div>
        </div>
        </nav>
    )
}

// import React, {ReactElement} from 'react';
// import {Link} from "react-router-dom";
//
// interface Props {
//
// }
//
// export default function Navbar({}: Props): ReactElement {
//     return (
//         <div className='container'>
//             <div className='leftSide'>
//                 <Link to='/store'> Products </Link>
//             </div>
//             <div className='rightSide'>
//                 <Link to='/auth'> Login </Link>
//                 <span>
//                     <Link to='/register'> Register </Link>
//                 </span>
//                 <span>
//                     <Link to='/cart'>Cart</Link>
//                 </span>
//             </div>
//         </div>
//     )
// }