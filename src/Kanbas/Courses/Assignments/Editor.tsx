export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
        The assignment is available onlineLinks to an external site. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
                Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
      </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <br/>
                <tr>
                    <td align="left" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <br/>
                <tr>
                    <td align="left" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade As </label>
                        <select id="wd-display-grade-as">
                            <option value="Percentage">Percentage</option>
                        </select>
                    </td>

                </tr>
                <br/>
                <tr>
                    <td align="left" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                        <select id="wd-submission-type">
                            <option value="Online">Online</option>
                        </select><br/>

                        <label>Online Entry Options</label><br/>
                        <input type="checkbox" name="text-entry" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>

                        <input type="checkbox" name="website-url" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>

                        <input type="checkbox" name="media-recordings" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                        <input type="checkbox" name="student-annotation" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                        <input type="checkbox" name="file-upload" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>

                <tr>
                    <td align="left" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>

                        <td>
                            <label htmlFor="wd-assign-to">Assign To</label>
                            <select id="wd-assign-to">
                                <option value="Everyone">Everyone</option>
                            </select><br/>

                            <label htmlFor="wd-due-date">Due</label>
                            <input type="date"
                                   id="wd-due-date"
                                   value="2024-05-13"/><br/>

                            <table>
                                <thead>
                                <tr>
                                    <th id="wd-available-from">Available From</th>
                                    <th id="wd-available-until">Until</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>
                                        <input type="date"
                                               id="wd-available-from"
                                               value="2024-05-06"/>
                                    </th>
                                    <th>
                                        <input type="date"
                                               id="wd-available-until"
                                               value="2024-05-20"/>
                                    </th>

                                </tr>

                                </tbody>
                            </table>

                        </td>

                    </td>
                </tr>


            </table>
        </div>
    );
}
