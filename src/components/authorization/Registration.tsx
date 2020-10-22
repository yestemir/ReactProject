import React, {ReactElement} from 'react'
import {Link} from "react-router-dom";
import {User} from "../../database/User";
import {users} from "../../database/users";
import { useHistory } from "react-router-dom";

interface Props {

}

export default function Registration({}: Props): ReactElement {
    let user: User = { email: "", id: 0, password: "", name: "" };
    let history = useHistory();

    return (
        <div className='container'>
            <div className='inputs'>
                <form>
                <span>Name</span>
                <input
                    type="text"
                    onChange={(e) => {
                        user.name = e.target.value;
                    }}
                    required
                />
                <span>Email</span>
                <input
                    type="email"
                    onChange={(e) => {
                        user.email = e.target.value;
                    }}
                    pattern="[^ @]*@[^ @]*"
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

                <button className="registerbtn" onClick={() => createNewUser(user)} >Submit</button>
                </form>
                <div className="container signin">
                    <Link to='/'><button className="cancelbtn" >Back to the main page</button></Link>
                </div>

            </div>
        </div>
    );

    function createNewUser(user: User) {
        if (users && user) {
            const checker = users.find((u) => u.email === user.email);
            if (checker) {
                return;
            }
            user.id = users.length + 1;
            users.push(user);
            history.push('/auth')
        }
    }
}