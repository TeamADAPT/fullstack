import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { MetricsCardProps } from '../../types/nova';

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, unit, icon }) => {
  return (
    <Card sx={{ minWidth: 275, height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" component="div" color="text.secondary">
            {title}
          </Typography>
          {icon && (
            <Box color="primary.main">
              {icon}
            </Box>
          )}
        </Box>
        <Typography variant="h4" component="div">
          {value}
          {unit && (
            <Typography variant="subtitle1" component="span" color="text.secondary" ml={1}>
              {unit}
            </Typography>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
