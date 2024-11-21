import axios from "axios";
import { enroll } from "./enrollmentReducer";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const createEnrollment = async (enrollment: any) => {
    const response = await axios.post(`${ENROLLMENTS_API}`, enrollment);
    return response.data;
}

export const deleteEnrollment = async (courseId: string, userId: string) => {
    const { data } = await axios.delete(`${ENROLLMENTS_API}/${courseId}/${userId}`);
    return data;
}

export const getCourseWithEnrollment = async () => {
    const response = await axios.get(`${ENROLLMENTS_API}/:courseId`);
    return response.data;
}

