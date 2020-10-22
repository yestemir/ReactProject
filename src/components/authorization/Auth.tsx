import React, {ReactElement} from 'react'
import {User} from "../../database/User";
import {Link} from "react-router-dom";
import {users} from "../../database/users";
import { Redirect, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

interface Props {

}

export default function Auth({}: Props): ReactElement {
    let user: User = { email: "", id: 0, password: "", name: "" };
    let history = useHistory();
    return (
        <div className='container'>
            <div className='inputs'>
                <form>
                <span>Email</span>
                <input
                    type="email"
                    onChange={(e) => {
                        user.email = e.target.value;
                    }}
                    required
                />
                <span>Password</span>
                <input
                    type="password"
                    onChange={(e) => {
                        user.password = e.target.value;
                    }}
                    required
                />

                <button className="registerbtn"  onClick={() => authenticateUser(user)}>Submit</button>
                </form>
                <div className="container signin">
                    <Link to='/'><button className="cancelbtn">Back to the main page</button></Link>
                </div>

            </div>
        </div>
    );

    function authenticateUser(user: User) {
        if (users && user) {
            console.log(user);
            const checker = users.find(
                (u) => u.email === user.email && u.password === user.password
            );
            if(checker) {
                console.log("aasaa");
                history.push('/')
            }

        }
    }
}