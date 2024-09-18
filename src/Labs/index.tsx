import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
export default function Labs() {
    return (
        <div>
            <h1>Rui Liu</h1>
            <a id="wd-github" href="https://github.com/retrouvailles00/kanbas-react-web-app">Github</a>
            <h1>Labs</h1>
            <TOC/>
        </div>
    );
}
