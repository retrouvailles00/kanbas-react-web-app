import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import {updateAssignment} from "./reducer";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignment, setAssignment] = useState<any>({});
    const currentAssignment = assignments.find((a: any) => a._id === aid);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentAssignment) {
            setAssignment(currentAssignment); // Set initial state to the current assignment
        }
    }, [currentAssignment]);

    const handleSave = () => {
        dispatch(updateAssignment(assignment));
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }
    if (!assignment) {
        return <div>Assignment not found</div>;
    }

    return (
        <div className="container" id="wd-assignments-editor">
            <div className="form-group pb-4">
                <label htmlFor="wd-name">Assignment Name</label>
                <input id="wd-name" className="form-control mb-2"
                       value={assignment.title}
                       onChange={(e) => setAssignment({ ...assignment, title:  e.target.value })}/>
            </div>
            <div className="form-group pb-4">
                <textarea id="wd-description" className="form-control" rows={10}
                          value={assignment.description}
                          onChange={(e) => setAssignment({ ...assignment, description:  e.target.value })}>

                </textarea>
            </div>
            <div className="form-group row pb-4">
                <label htmlFor="wd-points" className="col-sm-2 col-form-label">Points</label>
                <div className="col-sm-10">
                    <input id="wd-points" className="form-control"
                           value={currentAssignment.totalPoints}
                           onChange={(e) => setAssignment({ ...assignment, totalPoints:  e.target.value })}/>
                </div>
            </div>

            <div className="form-group row pb-4">
                <label htmlFor="wd-group" className="col-sm-2 col-form-label">Assignment Group</label>
                <div className="col-sm-10">
                    <select id="wd-group" className="form-select">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    </select>
                </div>
            </div>
            <div className="form-group row pb-4">
                <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label">Display Grade As</label>
                <div className="col-sm-10">
                    <select id="wd-display-grade-as" className="form-select">
                        <option value="Percentage">Percentage</option>
                    </select>
                </div>
            </div>
            <div className="form-group row pb-4">
                <label id="wd-submission-type" className="col-sm-2 col-form-label pb-4">Submission Type</label>
                <div className="col-sm-10 border border-gray">
                    <select id="wd-submission-type" className="form-select">
                        <option value="Online">Online</option>
                    </select>

                    <label className="mt-3 pb-4">Online Entry Options</label>
                    <div>
                        <div className="form-check pb-4">
                            <input type="checkbox" className="form-check-input" name="text-entry" id="wd-text-entry"/>
                            <label className="form-check-label" id="wd-text-entry">Text Entry</label>
                        </div>
                        <div className="form-check pb-4">
                            <input type="checkbox" className="form-check-input" name="website-url" id="wd-website-url"/>
                            <label className="form-check-label" id="wd-website-url">Website URL</label>
                        </div>
                        <div className="form-check pb-4">
                            <input type="checkbox" className="form-check-input" name="media-recordings"
                                   id="wd-media-recordings"/>
                            <label className="form-check-label" id="wd-media-recordings">Media Recordings</label>
                        </div>
                        <div className="form-check pb-4">
                            <input type="checkbox" className="form-check-input" name="student-annotation"
                                   id="wd-student-annotation"/>
                            <label className="form-check-label" id="wd-student-annotation">Student Annotation</label>
                        </div>
                        <div className="form-check pb-4">
                            <input type="checkbox" className="form-check-input" name="file-upload" id="wd-file-upload"/>
                            <label className="form-check-label" id="wd-file-upload">File Uploads</label>
                        </div>
                    </div>

                </div>
            </div>
            <div className="form-group row pb-4">
                <label id="wd-submission-type" className="col-sm-2 col-form-label">Assign</label>
                <div className="col-sm-10 border border-gray">
                    <div className="form-group row">
                        <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label">Assign To</label>
                        <div className="col-sm-9">
                            <select id="wd-assign-to" className="form-control">
                                <option value="Everyone">Everyone</option>
                            </select>
                        </div>
                    </div>



                    <div className="form-group row">
                        <div>
                            <label htmlFor="wd-due-date">Due</label>
                            <div>
                                <input type="date" id="wd-due-date" className="form-control" value={currentAssignment.dueDate}
                                       onChange={(e) => setAssignment({ ...assignment, dueDate:  e.target.value })}/>
                            </div>
                        </div>
                        <div className="form-group col">
                            <label className="col-sm-3 col-form-label">Available From</label>
                            <div className="col-sm-9">
                            <input type="date" id="wd-available-from" className="form-control" value={currentAssignment.availableDate}
                                   onChange={(e) => setAssignment({ ...assignment, availableDate:  e.target.value })}/>
                            </div>
                        </div>
                        <div className="form-group col">
                            <label className="col-sm-3 col-form-label">Available Until</label>
                            <div className="col-sm-9">
                                <input type="date" id="wd-available-until" className="form-control" value={currentAssignment.dueDate}
                                       onChange={(e) => setAssignment({ ...assignment, dueDate:  e.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="float-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
                    Cancel
                </Link>
                <button onClick={handleSave} id="wd-assignment-editor-save" className="btn btn-danger"> Save</button>
            </div>
        </div>
    );
}
