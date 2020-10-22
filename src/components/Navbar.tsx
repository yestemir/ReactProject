import React, {ReactElement} from 'react';
import {Link} from "react-router-dom";

interface Props {

}

export default function Navbar({}: Props): ReactElement {
    return (
        <div className='container'>
            <div className='leftSide'>
                <Link to='/store'> Products </Link>
            </div>
            <div className='rightSide'>
                <Link to='/auth'> Login </Link>
                <span>
                    <Link to='/register'> Register </Link>
                </span>
                <span>
                    <Link to='/cart'>Cart</Link>
                </span>
            </div>
        </div>
    )
}