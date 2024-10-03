import ModulesControls from "./ModulesControls";
import {BsGripVertical} from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { GrLink } from "react-icons/gr";
import { LuFileInput } from "react-icons/lu";
export default function Modules() {
    return (
        <div>
            <ModulesControls/><br/><br/><br/><br/>
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        Week 1
                        <ModuleControlButtons />
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            LEARNING OBJECTIVES
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <span className="ps-4">Introduction to the course</span>
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <span className="ps-4">Learn what is Web Development</span>
                            <LessonControlButtons/>
                        </li>

                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            READING
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <span className="ps-4">Full Stack Developer - Chapter 1 - Introduction</span>
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <span
                                className="ps-4">Full Stack Developer - Chapter 2 - Creating User Interface With HTML</span>
                            <LessonControlButtons/>
                        </li>

                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            SLIDES
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <GrLink className="text-success"/>
                            <span className="ps-4 text-danger">Introduction to Web Development</span>
                            <LuFileInput className="me-2 ps-2 fs-3 text-danger"/>
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <GrLink className="text-success"/>
                            <span
                                className="ps-4 text-danger">Creating an HTTP server with Node.js</span>
                            <LuFileInput className="me-2 ps-2 fs-3 text-danger"/>
                            <LessonControlButtons/>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <GrLink className="text-success"/>
                            <span
                                className="ps-4 text-danger">Creating a React Application</span>
                            <LuFileInput className="me-2 ps-2 fs-3 text-danger"/>
                            <LessonControlButtons/>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <GrLink className="text-success"/>
                            <span
                                className="ps-4 text-danger">Commit your source to Github.com</span>
                            <LuFileInput className="me-2 ps-2 fs-3 text-danger"/>
                            <LessonControlButtons/>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <GrLink className="text-success"/>
                            <span
                                className="ps-4 text-danger">Deploying to Netlify</span>
                            <LuFileInput className="me-2 ps-2 fs-3 text-danger"/>
                            <LessonControlButtons/>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <GrLink className="text-success"/>
                            <span
                                className="ps-4 text-danger">Deploying multiple branches to Netlify</span>
                            <LuFileInput className="me-2 ps-2 fs-3 text-danger"/>
                            <LessonControlButtons/>
                        </li>

                    </ul>
                </li>
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> Week 2</div>
                    <ul className="wd-lessons list-group rounded-0">
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            LEARNING OBJECTIVES
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <span className="ps-4">Introduction to the course</span>
                            <LessonControlButtons/>

                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3"/>
                            <span className="ps-4">Learn what is Web Development</span>
                            <LessonControlButtons/>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
