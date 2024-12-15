import { StatBlock } from '@/components/NewDashboard/DashComponents/StatBlock'
import { CircularGauge } from '@/components/NewDashboard/DashComponents/CircularGauge'
import { SuggestedImprovements } from '@/components/NewDashboard/DashComponents/SuggestedImprovements'
import { AverageFitScore } from '@/components/NewDashboard/DashComponents/AverageFitScore'
import { ResumeScreen } from '@/screens';
import { useState } from 'react';

const improvements = [
  { text: "Update your profile picture" },
  { text: "Add more skills to your profile" },
  { text: "Complete your work history" },
  { text: "Enhance your project descriptions" },
  { text: "Add relevant certifications" },
]

const averageFitScoreData = [
  { date: "2023-01", score: 6 },
  { date: "2023-02", score: 7 },
  { date: "2023-03", score: 6.5 },
  { date: "2023-04", score: 8 },
  { date: "2023-05", score: 7.5 },
]

export default function DashboardPage() {
  const [feedBackLoaded, setFeedBackLoaded] = useState(false);
  const [feedBackLoading, setFeedBackLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  return (
    <div className="flex gap-8 h-full p-6">
  {/* Left Panel */}
  <div className="w-[35%] flex items-center justify-center">
    <ResumeScreen setFeedBackLoaded={setFeedBackLoaded} setFeedBackLoading={setFeedBackLoading} setProgress={setProgress}/>
  </div>

  {/* Main Content Area */}
  <div className="w-[65%] flex flex-col gap-8 h-full">
    {/* Top Grid */}
    <div className="grid grid-cols-2 gap-8">
      
      
          <CircularGauge score={7} maxScore={10} feedBackLoaded={feedBackLoaded} feedBackLoading={feedBackLoading} progress={progress}/>
          <AverageFitScore data={averageFitScoreData} feedBackLoaded ={feedBackLoaded} feedBackLoading={feedBackLoading} progress={progress}/>
     
          
     

      
    </div>

    {/* Bottom Panel */}
    <StatBlock title="Suggested Improvements" className="flex-grow overflow-auto">
      <SuggestedImprovements improvements={improvements} />
    </StatBlock>
  </div>
</div>


  )
}

