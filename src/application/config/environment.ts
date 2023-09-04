export enum EnvironmentKeys {
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME',
}

export class Environment {
  private static getValue<T>(key: EnvironmentKeys): T {
    const value = process.env[key];

    if (!value) {
      throw new Error(`Missing environment variable ${key}`);
    }

    return value as unknown as T;
  }

  public static getString(key: EnvironmentKeys): string {
    const value = this.getValue<string>(key);

    if (!value) {
      throw new Error(`Invalid environment variable ${key}`);
    }

    return value;
  }

  public static getNumber(key: EnvironmentKeys): number {
    const value = this.getValue<number>(key);

    if (!value) {
      throw new Error(`Invalid environment variable ${key}`);
    }

    return Number(value);
  }

  public static getBoolean(key: EnvironmentKeys): boolean {
    const value = this.getValue<string>(key);

    if (!value) {
      throw new Error(`Invalid environment variable ${key}`);
    }

    return Boolean(value);
  }
}
