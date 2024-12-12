import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as client from "./client";
export default function FinishQuiz() {
    const { qid, responseId } = useParams();
    const [response, setResponse] = useState<any>(null);

    const fetchResponse = async () => {
        if (!responseId) return;
        const responseData = await client.findResponseById(responseId as string);
        console.log(responseData)
        if (responseData.length > 0) {
            setResponse(responseData[0]);
        } else {
            console.error("No response found for this ID");
        }
    };

    useEffect(() => {
        fetchResponse();
    }, [responseId]);

    if (!response) {
        return <div>Loading...</div>;
    }

    return (
        <div>Your total point is: {response.score}</div>
    )
}