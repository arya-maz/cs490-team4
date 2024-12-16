import { StatBlock } from '@/components/NewDashboard/DashComponents/StatBlock'
import { CircularGauge } from '@/components/NewDashboard/DashComponents/CircularGauge'
import { SuggestedImprovements } from '@/components/NewDashboard/DashComponents/SuggestedImprovements'
import { AverageFitScore } from '@/components/NewDashboard/DashComponents/AverageFitScore'
import { ResumeScreen } from '@/screens';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button2.tsx"
import jsPDF from 'jspdf';

const calculateTrend = (data, setTrendScore) => {
  if (data.length < 2) {
    // Not enough data points to calculate a trend
    setTrendScore(0);
    return;
  }

  // Get the two most recent scores
  const latestScore = data[data.length - 1].score;
  const previousScore = data[data.length - 2].score;

  // Calculate percentage change and round to the nearest integer
  const trendPercentage = Math.round(((latestScore - previousScore) / previousScore) * 100);

  // Update the trend score
  setTrendScore(trendPercentage);
};


export default function DashboardPage() {
  const [feedBackLoaded, setFeedBackLoaded] = useState(false);
  const [feedBackLoading, setFeedBackLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [averageFitScoreData, setAverageFitScoreData] = useState([]);
  const [trendScore, setTrendScore] = useState(0);
  const [feedBack, setFeedBack] = useState([]);
  const [fitScore, setFitScore] = useState(0);


  useEffect(() => {
    calculateTrend(averageFitScoreData, setTrendScore);
  }, [averageFitScoreData]);

  useEffect(() => {
    // Fetch feedback and fitScore when it changes
    if (feedBackLoaded) {
      setFeedBack(feedBack);
      setFitScore(fitScore);
    }
  }, [feedBack, fitScore, feedBackLoaded]);

  const transformedFeedBack = feedBack
  .filter(item => item.trim() !== "") // Remove empty strings
  .map(item => ({ text: item })); // Convert strings to objects

  const handleDownloadFeedback = () => {
    if (!feedBack || feedBack.length === 0 || fitScore === null) {
      alert('Feedback or Fit Score is missing!');
      return;
    }

    // Initialize jsPDF
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('User Feedback Report', 10, 20);

    // Fit Score
    doc.setFontSize(14);
    doc.text(`Fit Score: ${fitScore}`, 10, 40);

    // Feedback
    doc.setFontSize(12);
    doc.text('Feedback:', 10, 60);

    if (feedBack.length > 0) {
      feedBack.forEach((item, index) => {
        doc.text(`${index + 1}. ${item}`, 10, 70 + index * 10);
      });
    } else {
      doc.text('No feedback provided.', 10, 70);
    }

    // Save and download the PDF
    doc.save('feedback_report.pdf');
  };
  return (
    <div className="flex gap-8 h-full p-6">
  {/* Left Panel */}
  <div className="w-[35%] flex items-center justify-center">
    <ResumeScreen setAverageFitScoreData = {setAverageFitScoreData} setFeedBackLoaded={setFeedBackLoaded} setFeedBackLoading={setFeedBackLoading} setProgress={setProgress} setFeedBack={setFeedBack} setFitScore={setFitScore}/>
  </div>

  {/* Main Content Area */}
  <div className="w-[65%] flex flex-col gap-8 h-full">
    {/* Top Grid */}
    <div className="grid grid-cols-2 gap-8">
      
      
          <CircularGauge score={fitScore} maxScore={100} feedBackLoaded={feedBackLoaded} feedBackLoading={feedBackLoading} progress={progress}/>
          <AverageFitScore trendScore={trendScore} chartData={averageFitScoreData} feedBackLoaded ={feedBackLoaded} feedBackLoading={feedBackLoading} progress={progress}/>
     
          
     

      
    </div>

    {/* Bottom Panel */}
    <StatBlock title="Suggested Improvements" className="flex-grow overflow-auto">
      <Button className="mb-4" disabled={!feedBack || feedBack.length === 0} onClick={handleDownloadFeedback}>Download report</Button>
      <SuggestedImprovements improvements={transformedFeedBack} feedBackLoaded={feedBackLoaded} feedBackLoading={feedBackLoading} progress={progress}/>
    </StatBlock>
  </div>
</div>


  )
}

