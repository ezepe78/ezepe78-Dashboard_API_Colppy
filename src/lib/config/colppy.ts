const DEFAULT_BASE_URL = 'http://powerbi.tecnonegocios.com.ar:8000/api';

export const colppyConfig = {
  baseUrl: process.env.COLPPY_API_BASE_URL ?? DEFAULT_BASE_URL,
  username: process.env.COLPPY_API_USERNAME ?? '',
  password: process.env.COLPPY_API_PASSWORD ?? '',
};

export function getColppyBasicAuthHeader() {
  if (!colppyConfig.username || !colppyConfig.password) return null;
  const token = Buffer.from(`${colppyConfig.username}:${colppyConfig.password}`).toString('base64');
  return `Basic ${token}`;
}
