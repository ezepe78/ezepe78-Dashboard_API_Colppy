export type EndpointKey = 'modelo1' | 'modelo2' | 'modelo3';

export interface EndpointStatus {
  endpoint: string;
  ok: boolean;
  respondedAt: string;
  durationMs: number;
  error?: string;
}

export interface SyncMetadata {
  lastAttemptAt?: string;
  lastSuccessAt?: string;
  lastAttemptOk?: boolean;
  endpointStatus: Record<EndpointKey, EndpointStatus>;
  warnings: string[];
}

export interface CachedDashboardData {
  modelo1?: Record<string, unknown[]>;
  modelo2?: Record<string, unknown[]>;
  modelo3?: Record<string, unknown[]>;
  metadata: SyncMetadata;
}
