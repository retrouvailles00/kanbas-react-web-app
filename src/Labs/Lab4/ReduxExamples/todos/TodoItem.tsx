import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({todo}:any) {
    const dispatch = useDispatch();
    return (
        <li className="d-flex mb-3" key={todo.id}>
            {todo.title}
            <button className="btn btn-primary me-2" onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"> Edit
            </button>
            <button className="btn btn-danger" onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"> Delete
            </button>
        </li>
    );
}
