export default function AssignmentEditor() {
    return (
        <div className="container" id="wd-assignments-editor">
            <div className="form-group pb-4">
                <label htmlFor="wd-name">Assignment Name</label>
                <input id="wd-name" className="form-control mb-2" placeholder="A1 - ENV + HTML"/>
            </div>
            <div className="form-group pb-4">
                <textarea id="wd-description" className="form-control" rows={10}>
                The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
                Your full name and section Links to each of the lab assignments Links to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
                </textarea>
            </div>
            <div className="form-group row pb-4">

                <label htmlFor="wd-points" className="col-sm-2 col-form-label">Points</label>
                <div className="col-sm-10">
                    <input id="wd-points" className="form-control" value="100"/>
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
                                <input type="date" id="wd-due-date" className="form-control" value="2024-05-13"/>
                            </div>
                        </div>
                        <div className="form-group col">
                            <label className="col-sm-3 col-form-label">Available From</label>
                            <div className="col-sm-9">
                            <input type="date" id="wd-available-from" className="form-control" value="2024-05-06"/>
                            </div>
                        </div>
                        <div className="form-group col">
                            <label className="col-sm-3 col-form-label">Available Until</label>
                            <div className="col-sm-9">
                                <input type="date" id="wd-available-until" className="form-control" value="2024-05-20"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="float-end">
                <button className="btn btn-secondary mt-3">Cancel</button>
                <button className="btn btn-danger mt-3">Save</button>

            </div>
        </div>
    );
}
