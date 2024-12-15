import { StatBlock } from '@/components/NewDashboard/DashComponents/StatBlock'
import { CircularGauge } from '@/components/NewDashboard/DashComponents/CircularGauge'
import { SuggestedImprovements } from '@/components/NewDashboard/DashComponents/SuggestedImprovements'
import { AverageFitScore } from '@/components/NewDashboard/DashComponents/AverageFitScore'

import { ResumeScreen } from '@/screens';

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
  return (
    <div className="flex gap-6 h-full">
      <div className="w-[20%]">
        <ResumeScreen title="Input" className="h-full">
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Input Area
          </div>
        </ResumeScreen>
      </div>
      <div className="w-1/2 flex flex-col gap-6 h-full">
        <div className="grid grid-cols-2 gap-6">
          <StatBlock title="Fit Score">
            <div className="flex flex-col items-center">
              <CircularGauge score={7} maxScore={10} />
              <p className="mt-2 text-sm text-muted-foreground">Your current fit score</p>
            </div>
          </StatBlock>
          <StatBlock title="Average Fit Score">
            <AverageFitScore data={averageFitScoreData} />
          </StatBlock>
        </div>
        <StatBlock title="Suggested Improvements" className="flex-grow overflow-auto">
          <SuggestedImprovements improvements={improvements} />
        </StatBlock>
      </div>
    </div>
  )
}

