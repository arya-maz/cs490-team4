import { Check } from 'lucide-react'

interface Improvement {
  text: string
}

interface SuggestedImprovementsProps {
  improvements: Improvement[]
}

export function SuggestedImprovements({ improvements }: SuggestedImprovementsProps) {
  return (
    <ul className="space-y-2 overflow-auto">
      {improvements.map((improvement, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-foreground">{improvement.text}</span>
        </li>
      ))}
    </ul>
  )
}

