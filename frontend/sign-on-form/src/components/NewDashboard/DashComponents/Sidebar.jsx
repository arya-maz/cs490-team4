import Link from 'next/link'
import { Home, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button2"

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div className={`bg-card flex flex-col ${className}`} {...props}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground">AI Resume Analyzer</h1>
      </div>
      <nav className="flex-1 mt-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:text-white hover:bg-accent"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

