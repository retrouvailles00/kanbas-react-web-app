import { useSelector } from "react-redux";
export default function Lab3() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div>
            <h2>Lab 3</h2>
            <ul className="list-group">
                {todos.map((todo: any) => (
                    <li className="list-group-item" key={todo.id}>
                        {todo.title}
                    </li>
                ))}
            </ul>
            <hr/>
        </div>
    );
}
