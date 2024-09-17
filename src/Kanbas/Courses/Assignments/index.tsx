export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input id="wd-search-assignment"
                   placeholder="Search for Assignments" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link"
                       href="#/Kanbas/Courses/1234/Assignments/1">
                        A1 - ENV + HTML
                    </a>
                    <div>
                        <div>
                            <div style={{
                                display: 'inline'
                            }}>
                                Multiple Modules | </div>
                            <div style={{
                                display: 'inline',
                                fontWeight: 'bold'
                            }}>
                                Not Available until </div>
                            <div style={{
                                display: 'inline'
                            }}>
                                May 6 at 12:00am | </div>
                        </div>
                        <div>
                            <div style={{
                                display: 'inline',
                                fontWeight: 'bold'
                            }}>
                                Due </div>
                            May 13 at 11:59pm | 100pts
                            </div>
                        </div>
                </li>
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link"
                       href="#/Kanbas/Courses/1234/Assignments/2">
                        A2 - CSS + BOOTSTRAP
                    </a>
                    <div>
                        <div>
                            <div style={{
                                display: 'inline'
                            }}>
                                Multiple Modules | </div>
                            <div style={{
                                display: 'inline',
                                fontWeight: 'bold'
                            }}>
                                Not Available until </div>
                            <div style={{
                                display: 'inline'
                            }}>
                                May 13 at 12:00am | </div>
                        </div>
                        <div>
                            <div style={{
                                display: 'inline',
                                fontWeight: 'bold'
                            }}>
                                Due </div>
                            May 20 at 11:59pm | 100pts
                        </div>
                    </div>
                </li>
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link"
                       href="#/Kanbas/Courses/1234/Assignments/3">
                        A3 - JAVASCRIPT + REACT
                    </a>
                    <div>
                        <div>
                            <div style={{
                                display: 'inline'
                            }}>
                                Multiple Modules | </div>
                            <div style={{
                                display: 'inline',
                                fontWeight: 'bold'
                            }}>
                                Not Available until </div>
                            <div style={{
                                display: 'inline'
                            }}>
                                May 20 at 12:00am | </div>
                        </div>
                        <div>
                            <div style={{
                                display: 'inline',
                                fontWeight: 'bold'
                            }}>
                                Due </div>
                            May 27 at 11:59pm | 100pts
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
