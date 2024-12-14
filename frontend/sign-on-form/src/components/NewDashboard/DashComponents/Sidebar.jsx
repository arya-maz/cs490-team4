import React from 'react';
import { Home, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
];

export function Sidebar({ className, ...props }) {
  return (
    <div className={`bg-card flex flex-col ${className}`} {...props}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground">AI Resume Analyzer</h1>
      </div>
      <nav className="flex-1 mt-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center px-6 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-6">
        <button 
          className="w-full flex items-center justify-start px-4 py-2 text-white hover:text-white hover:bg-accent rounded-md transition-colors duration-200"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
};

