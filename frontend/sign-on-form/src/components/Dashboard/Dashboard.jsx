import { Outlet, Link } from "react-router-dom";
import './Dashboard.css';


const Dashboard = () => {
    return (
        <div>
            <aside>
                <ul id="sidebuttons">
                    <li><Link to='/(Upload Resume Form)'>Upload Resume</Link></li>
                    <li><Link to='/login'>Return to Login Page</Link></li>
                </ul>
            </aside>
            <div id="boxes">
                <section id="s1">
                    <div id="fit_chart">
                        <p>Fit chart in this box</p>
                    </div>
                    <div id="matches">
                        <p>Matches go here</p>
                    </div>
                </section>
                <section id="s2">
                    <div id="improvements">
                        <p>Improvements box</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;