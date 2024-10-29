import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";
import {useSelector} from "react-redux";

const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enroll: (state, { payload: enrollment }) => {
            state.enrollments = [...state.enrollments, enrollment] as any;
        },
        unenroll: (state, { payload: enrollmentIndex }) => {
            state.enrollments = [
                ...state.enrollments.slice(0, enrollmentIndex),
                ...state.enrollments.slice(enrollmentIndex + 1),
            ];
        },
    },
});

export const { enroll, unenroll } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;