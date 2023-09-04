import { Environment, EnvironmentKeys } from '../../application/config/environment';
import DatabaseConnection from './database-connection';
import { createConnection, Connection } from 'mysql2/promise';

export default class MysqlAdapter implements DatabaseConnection {
  private readonly connection: Connection;

  private constructor(connection: Connection) {
    this.connection = connection;
  }

  static async create(): Promise<MysqlAdapter> {
    const connection = await createConnection({
      host: Environment.getString(EnvironmentKeys.DATABASE_HOST),
      port: Environment.getNumber(EnvironmentKeys.DATABASE_PORT),
      user: Environment.getString(EnvironmentKeys.DATABASE_USER),
      password: Environment.getString(EnvironmentKeys.DATABASE_PASSWORD),
      database: Environment.getString(EnvironmentKeys.DATABASE_NAME),
    });
    return new MysqlAdapter(connection);
  }

  async query<T>(statement: string, params?: unknown[] | undefined): Promise<T> {
    const [rows] = await this.connection.execute(statement, params);
    return rows as T;
  }

  async close(): Promise<void> {
    await this.connection.end();
  }
}
