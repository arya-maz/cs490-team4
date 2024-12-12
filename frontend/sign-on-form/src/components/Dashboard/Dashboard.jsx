import { useNavigate } from "react-router-dom";
import './Dashboard.css';
const Dashboard = () => {
    const navigate = useNavigate();
    return (
    <div>
        <header>
            <h1>AI-Powered Resume Analyzer</h1>
        </header>
        <body>
            <div id="boxes">
                    <div id="fit_chart" class="box">
                        <h3>Fit Score</h3>
                        <p>{getFitChart()}</p>
                    </div>
                    <div id="matches" class="box">
                        <h3>Matches</h3>
                        <p>{getMatches()}</p>
                    </div>
                    <div id="improvements" class="box">
                        <h3>Suggested Improvements</h3>
                        <p>{getImprovements()}</p>
                    </div>
            </div>
        </body>
        <footer>
            <button id="return" onClick={() => {navigate('/');}}>Return to Login Page</button>
            <h3>Created by the Professional Back-End Developers</h3>
        </footer>
    </div>
    );
}

function getFitChart() {
    //Get the fit chart from the result
    return "7";
}

function getMatches() {
    //Get the matches from the result
    return "Computer Science";
}

function getImprovements() {
    //Get the improvements from the result
    return "Improve wording"
}

export default Dashboard;