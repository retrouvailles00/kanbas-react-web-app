import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrolledCourses: [],
};

const enrollmentsSlice = createSlice({
    name: "enrolledCourses",
    initialState,
    reducers: {
        setEnrolledCourses: (state, action) => {
            state.enrolledCourses = action.payload;
        },
        enroll: (state, { payload: enrolledCourse }) => {
            state.enrolledCourses = [...state.enrolledCourses, enrolledCourse] as any;
        },
        unenroll: (state, { payload: courseId }) => {
            state.enrolledCourses = state.enrolledCourses.filter(
                (c: any) => c._id !== courseId);
        }
    },
});

export const { enroll, unenroll, setEnrolledCourses } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;