import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CachedDashboardData } from '@/types/dashboard';

const cacheDir = path.join(process.cwd(), '.cache');
const cacheFile = path.join(cacheDir, 'dashboard.json');

export async function readDashboardCache(): Promise<CachedDashboardData | null> {
  try {
    const raw = await readFile(cacheFile, 'utf-8');
    return JSON.parse(raw) as CachedDashboardData;
  } catch {
    return null;
  }
}

export async function writeDashboardCache(data: CachedDashboardData) {
  await mkdir(cacheDir, { recursive: true });
  await writeFile(cacheFile, JSON.stringify(data, null, 2), 'utf-8');
}
