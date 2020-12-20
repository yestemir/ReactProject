  
import React, {FormEvent, ReactElement, useReducer, useState} from 'react';
import { User } from '../database/User';
import './profile.css';
import ShoppingList from "./ShoppingList";

interface Props {
    curUser: User | null;
}


export enum Actions {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
}

export interface ITodo {
    id: number;
    name: string;
    complete: boolean;
}

export interface Action {
    type: Actions;
    payload: any;
}

function reducer(todos: ITodo[], action: Action) {
    switch (action.type) {
        case Actions.ADD_TODO:
            return [...todos, addTodo(action.payload.name)];

        case Actions.TOGGLE_TODO:
            return todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, complete: !todo.complete };
                }
                return todo;
            });

        case Actions.DELETE_TODO:
            return todos.filter((todo) => todo.id !== action.payload.id);

        default:
            return todos;
    }
}

function addTodo(name: string): ITodo {
    return { id: Date.now(), name, complete: false };
}

function Profile({curUser}: Props): ReactElement {
    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch({ type: Actions.ADD_TODO, payload: { name: name } });
        setName("");
    }

    if (curUser) return (
        <div id="first">
            <div className="card-wrap">
                <div className="profile_pic-wrap">
                    <img src="https://images.vexels.com/media/users/3/135606/isolated/preview/b474b5c5c7ac007448c0111ac3a3eb29-cat-face-round-icon-by-vexels.png" alt="" />
                </div>
                <div className="info-wrap">
                    <h1 className="user-name">{curUser.name}</h1>
                    <p>{curUser.email}</p>
                </div>
            </div>

            <h1 id="shoppingList">Shopping List</h1>
            <form className="form__group field" onSubmit={handleSubmit}>
                <input type="input" className="form__field" placeholder="to buy" name="name" id='name' required
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name" className="form__label">Products to buy</label>
            </form>

            {/*<form onSubmit={handleSubmit} className="todo-list">*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={name}*/}
            {/*        onChange={(e) => setName(e.target.value)}*/}
            {/*    />*/}
            {/*</form>*/}



            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={name}*/}
            {/*        onChange={(e) => setName(e.target.value)}*/}
            {/*    />*/}
            {/*</form>*/}

            {todos.map((todo) => {
                return <ShoppingList key={todo.id} todo={todo} dispatch={dispatch} />;
            })}
        </div>
    );
        // return (
        // <section id="store" className="store py-5" style={{backgroundColor: "transparent"}}>
        //     <div className="container">
        // <div>
        //     <h5>Name: {curUser.name}</h5>
        //     <h5>Password: {curUser.password}</h5>
        //     <h5>Функционал в стадии разработки. Ждите обновлений :)</h5>
        // </div>
        //     </div>
        // </section>
    // )
    return <></>;
}

export default Profile;