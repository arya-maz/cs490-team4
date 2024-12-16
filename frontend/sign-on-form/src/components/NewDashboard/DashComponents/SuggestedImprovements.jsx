/**
 * This file is responsible for the "Suggested Improvements" block
 * 
 */

import React from 'react';
import { Check } from 'lucide-react';
import PropTypes from 'prop-types';
import { Progress } from "@/components/ui/progress.tsx"
export function SuggestedImprovements({ improvements, feedBackLoaded, feedBackLoading, progress }) {
  return (
    <>
    {!feedBackLoaded && !feedBackLoading && <div className="flex items-center justify-center h-full">
      <p>No data yet</p>
      </div>}
    {feedBackLoaded &&<ul className="space-y-2 overflow-auto">
      {improvements.map((improvement, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-foreground">{improvement.text}</span>
        </li>
      ))}
    </ul>}
     {feedBackLoading && <div className="flex items-center justify-center h-full"><Progress value={progress} /></div>}
    </>
  )
}

SuggestedImprovements.propTypes = {
  improvements: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};