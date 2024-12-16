/**
 * This file makes a call to backend to retrieve AI model response
 * 
 */

import axios from 'axios';
import { sendUid } from '../../../screens/ResumeScreen.jsx'; //get uid from ResumeScreen.jsx


// Request and Retrieving data from "/api/analyze"
const result =  async () => {
  try {
    if (!sendUid) {
      console.error("UID is not defined");
      return false;
    }

    const response = await axios.post('http://localhost:8000/api/analyze', { uid: sendUid });

    const feedBack = response.data.feedback;
    const fitScore = response.data.fit_score;

    console.log("response: ",feedBack, fitScore );

    return { feedBack, fitScore };
  }catch(error) {
    if (error.response) {
      // The request was made, and the server responded with a status code outside 2xx
      console.error("Server Error:", error.response.data || error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server.");
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return false;
  }
};