import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import React from "react";
export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <li className="d-flex mb-3">
            <input
                className="form-control me-2"
                defaultValue={todo.title}
                onChange={(e) => dispatch(setTodo({...todo, title: e.target.value}))}/>

            <button className="btn btn-warning me-2" onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click"> Update
            </button>

            <button className="btn btn-success" onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click"> Add
            </button>
        </li>
    );
}

