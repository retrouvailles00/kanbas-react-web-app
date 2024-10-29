import { createSlice } from "@reduxjs/toolkit";
import {assignments } from "../../Database";
import {useParams} from "react-router";

const initialState = {
    assignments: assignments,
};

const assignentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            state.assignments.push(assignment);
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId);
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },
    },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
    assignentsSlice.actions;
export default assignentsSlice.reducer;