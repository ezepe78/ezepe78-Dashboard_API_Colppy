type CacheEntry<T> = { value: T; expiresAt: number };

const cacheStore = new Map<string, CacheEntry<unknown>>();

const ttlMinutes = Number(process.env.CACHE_TTL_MINUTES ?? '15');
const ttlMs = Number.isFinite(ttlMinutes) && ttlMinutes > 0 ? ttlMinutes * 60_000 : 15 * 60_000;

export function getCache<T>(key: string): T | null {
  const entry = cacheStore.get(key);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    cacheStore.delete(key);
    return null;
  }
  return entry.value as T;
}

export function setCache<T>(key: string, value: T) {
  cacheStore.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function getCacheMeta(key: string) {
  const entry = cacheStore.get(key);
  if (!entry) return null;
  return { expiresAt: entry.expiresAt };
}
