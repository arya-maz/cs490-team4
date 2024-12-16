import { StatBlock } from '@/components/NewDashboard/DashComponents/StatBlock'
import { CircularGauge } from '@/components/NewDashboard/DashComponents/CircularGauge'
import { SuggestedImprovements } from '@/components/NewDashboard/DashComponents/SuggestedImprovements'
import { AverageFitScore } from '@/components/NewDashboard/DashComponents/AverageFitScore'
import { ResumeScreen } from '@/screens';
import { useEffect, useState } from 'react';

const improvements = [
  { text: "Update your profile picture" },
  { text: "Add more skills to your profile" },
  { text: "Complete your work history" },
  { text: "Enhance your project descriptions" },
  { text: "Add relevant certifications" },
]

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
      <SuggestedImprovements improvements={transformedFeedBack} feedBackLoaded={feedBackLoaded} feedBackLoading={feedBackLoading} progress={progress}/>
    </StatBlock>
  </div>
</div>


  )
}

