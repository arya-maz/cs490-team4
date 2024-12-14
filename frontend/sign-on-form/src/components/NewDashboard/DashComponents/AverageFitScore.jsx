import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'

interface AverageFitScoreProps {
  data: { date: string; score: number }[]
}

export function AverageFitScore({ data }: AverageFitScoreProps) {
  return (
    <div className="h-[200px] flex items-end justify-center">
      <ResponsiveContainer width="90%" height="80%">
        <LineChart data={data}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Score</span>
                        <span className="font-bold">{payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#8884d8" 
            strokeWidth={2} 
            dot={{ r: 4, fill: "#8884d8" }}
            activeDot={{ r: 6, fill: "#8884d8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

