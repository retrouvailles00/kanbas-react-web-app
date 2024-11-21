import React, { useState } from "react";
export default function QueryParameters() {
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");
    return (
        <div>
            <h3>Query Parameters</h3>
            <input id="wd-query-parameter-a"
                className="form-control mb-2"
                defaultValue={a} type="number"
                onChange={(e) => setA(e.target.value)} />
            <input id="wd-query-parameter-b"
                className="form-control mb-2"
                defaultValue={b} type="number"
                onChange={(e) => setB(e.target.value)} />

        </div>
);
}