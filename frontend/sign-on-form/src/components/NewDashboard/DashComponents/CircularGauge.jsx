"use client"
/**
 * This file is responsble for the "Your Fit Score"
 * 
 */
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { ChartConfig, ChartContainer } from "@/components/ui/chart.tsx"
import { Progress } from "@/components/ui/progress.tsx"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
}

export function CircularGauge({score,maxScore, feedBackLoaded, feedBackLoading, progress}) {
  const chartData = [
    { browser: "safari", visitors: score, fill: "var(--color-safari)" },
  ]
  return (
    <Card className="flex flex-col min-h-[300px]">
     <CardHeader className="pb-2"> {/* Adjust padding-bottom */}
        <CardTitle>Your Fit Score</CardTitle>
        <CardDescription className="mb-1"> {/* Adjust margin-bottom */}
          A score that shows how your resume compares to the job description.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-0 pb-0"> {/* Remove top padding */}
      {!feedBackLoaded && !feedBackLoading && <div className="flex items-center justify-center h-full">
      <p>No data yet</p>
      </div>}
      {feedBackLoading && <div className="flex items-center justify-center h-full"><Progress value={progress} /></div>}
        {feedBackLoaded && <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          out of 100
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>}
      </CardContent>
      {feedBackLoaded &&<CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Hmmmmm Looking Goooood <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Take a look at some suggestions below to make it even better
        </div>
      </CardFooter>}
     
      
    </Card>
  );
  
}
