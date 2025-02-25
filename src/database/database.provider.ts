import { neon } from '@neondatabase/serverless';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DRIZZLE } from './drizzle.constant';

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-empty-object-type
export interface DrizzleDatabase extends NeonHttpDatabase<Record<string, never>> { }


export const DatabaseProvider: Provider<DrizzleDatabase> = {
  inject: [ConfigService],
  provide: DRIZZLE,
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.get<string>('POSTGRESQL_NEON_DB_URL');
    const sql = neon(connectionString!);
    return drizzle(sql);
  },
};
