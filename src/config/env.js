export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.kalma.local',
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'local',
  appName: import.meta.env.VITE_APP_NAME || 'Kalma',
}
