import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card2"

interface StatBlockProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function StatBlock({ title, children, className }: StatBlockProps) {
  return (
    <Card className={`bg-card text-card-foreground ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

