import { SyncMetadata } from './dashboard';

export interface DashboardApiResponse {
  ok: boolean;
  data?: {
    metadata?: SyncMetadata;
  };
  message?: string;
}
