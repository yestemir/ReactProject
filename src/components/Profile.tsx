import React, { ReactElement } from 'react';
import { User } from '../database/User';

interface Props {
    curUser: User;
}

function Profile({curUser}: Props): ReactElement {
    return (
        <section id="store" className="store py-5" style={{backgroundColor: "transparent"}}>
            <div className="container">
        <div>
            <h5>Name: {curUser.name}</h5>
            <h5>Password: {curUser.password}</h5>
        </div>
            </div>
        </section>
    )
}

export default Profile;