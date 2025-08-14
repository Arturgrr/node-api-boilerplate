export interface ICacheProvider {
    set(key: string, value: string, ttlInSeconds: number): Promise<void>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<void>;
  }