import { ReactNode } from 'react';

// Nova GUI Types

export interface NovaMetrics {
  serverStatus: 'online' | 'offline';
  connectionStatus: boolean;
  lastUpdated: string;
  metrics: {
    cpu: number;
    memory: number;
    requests: number;
    errors: number;
  };
}

export interface NovaConfig {
  serverPort: number;
  prometheusEndpoint: string;
  refreshInterval: number;
  endpoints: {
    api: string;
    websocket: string;
    metrics: string;
  };
}

export interface NovaState {
  isConnected: boolean;
  metrics: NovaMetrics | null;
  config: NovaConfig;
  error: string | null;
  isLoading: boolean;
}

export interface NovaAction {
  type: string;
  payload?: any;
}

// Component Props Types
export interface DashboardProps {
  metrics: NovaMetrics | null;
  onRefresh: () => void;
  isLoading: boolean;
}

export interface MetricsCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: ReactNode;
}

export interface ConnectionStatusProps {
  isConnected: boolean;
  lastUpdated: string;
  onReconnect: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}
