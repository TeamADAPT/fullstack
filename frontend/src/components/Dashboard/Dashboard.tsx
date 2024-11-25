import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, Alert } from '@mui/material';
import { Memory, Speed, NetworkCheck, Error } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { setLoading, updateMetrics } from '../../store/novaSlice';
import MetricsCard from './MetricsCard';
import { NovaMetrics } from '../../types/nova';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { metrics, isLoading, error, isConnected } = useAppSelector(state => state.nova);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        dispatch(setLoading(true));
        // TODO: Replace with actual API call
        const response = await fetch('/api/metrics');
        const data: NovaMetrics = await response.json();
        dispatch(updateMetrics(data));
      } catch (err) {
        console.error('Failed to fetch metrics:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (isConnected) {
      fetchMetrics();
      const interval = setInterval(fetchMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [dispatch, isConnected]);

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            Nova Dashboard
          </Typography>
          <Button
            variant="contained"
            color={isConnected ? 'success' : 'error'}
            startIcon={<NetworkCheck />}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricsCard
              title="CPU Usage"
              value={metrics?.metrics.cpu || 0}
              unit="%"
              icon={<Speed />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricsCard
              title="Memory Usage"
              value={metrics?.metrics.memory || 0}
              unit="MB"
              icon={<Memory />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricsCard
              title="Requests"
              value={metrics?.metrics.requests || 0}
              icon={<NetworkCheck />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricsCard
              title="Errors"
              value={metrics?.metrics.errors || 0}
              icon={<Error />}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
