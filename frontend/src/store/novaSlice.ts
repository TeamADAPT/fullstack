import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NovaState, NovaMetrics, NovaConfig } from '../types/nova';

const initialConfig: NovaConfig = {
  serverPort: 8000,
  prometheusEndpoint: 'http://localhost:9090',
  refreshInterval: 5000,
  endpoints: {
    api: 'http://localhost:8000/api',
    websocket: 'ws://localhost:8000/ws',
    metrics: 'http://localhost:8000/metrics'
  }
};

const initialState: NovaState = {
  isConnected: false,
  metrics: null,
  config: initialConfig,
  error: null,
  isLoading: false
};

const novaSlice = createSlice({
  name: 'nova',
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<NovaMetrics>) => {
      state.metrics = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateConfig: (state, action: PayloadAction<Partial<NovaConfig>>) => {
      state.config = { ...state.config, ...action.payload };
    }
  }
});

export const {
  setConnectionStatus,
  updateMetrics,
  setError,
  setLoading,
  updateConfig
} = novaSlice.actions;

export default novaSlice.reducer;
