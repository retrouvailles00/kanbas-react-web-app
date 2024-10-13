import {useLocation, useParams} from "react-router";
import {courses} from "../../Database";
import * as db from "../../Database";
import {Link} from "react-router-dom";

export default function AssignmentEditor() {
    const { pathname } = useLocation();
    const { cid, aid } = useParams();
    // console.log(cid)
    console.log(aid)
    const assignments = db.assignments;
    const assignment = db.assignments.find((a) => a._id === aid);
    if (!assignment) {
        return <div>Assignment not found</div>;
    }
    return (
        <div className="container" id="wd-assignments-editor">
            <div className="form-group pb-4">
                <label htmlFor="wd-name">Assignment Name</label>
                <input id="wd-name" className="form-control mb-2" placeholder={assignment.title}/>
            </div>
            <div className="form-group pb-4">
                <textarea id="wd-description" className="form-control" rows={10}>
                {assignment.description}
                </textarea>
            </div>
            <div className="form-group row pb-4">
                <label htmlFor="wd-points" className="col-sm-2 col-form-label">Points</label>
                <div className="col-sm-10">
                    <input id="wd-points" className="form-control" value={assignment.totalPoints}/>
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
                                <input type="date" id="wd-due-date" className="form-control" value={assignment.dueDate}/>
                            </div>
                        </div>
                        <div className="form-group col">
                            <label className="col-sm-3 col-form-label">Available From</label>
                            <div className="col-sm-9">
                            <input type="date" id="wd-available-from" className="form-control" value={assignment.availableDate}/>
                            </div>
                        </div>
                        <div className="form-group col">
                            <label className="col-sm-3 col-form-label">Available Until</label>
                            <div className="col-sm-9">
                                <input type="date" id="wd-available-until" className="form-control" value={assignment.dueDate}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="float-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
                    Cancel
                </Link>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">
                    Save
                </Link>
            </div>
        </div>
    );
}
