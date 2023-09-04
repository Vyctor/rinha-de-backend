export default interface DatabaseConnection {
  query<T>(statement: string, params?: unknown[]): Promise<T>;
  close(): Promise<void>;
}
