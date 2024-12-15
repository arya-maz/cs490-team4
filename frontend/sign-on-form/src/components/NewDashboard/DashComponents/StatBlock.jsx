import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import PropTypes from 'prop-types';

export function StatBlock({ title, children, className }) {
  return (
    <Card className={`bg-card text-card-foreground ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

StatBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};