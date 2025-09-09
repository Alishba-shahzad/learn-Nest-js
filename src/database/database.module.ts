import { Module, DynamicModule } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useFactory: async () => {
            const dataSource = new DataSource(options);
            if (!dataSource.isInitialized) {
              await dataSource.initialize();
            }
            return dataSource;
          },
        },
      ],
      exports: ['CONNECTION'],
    };
  }
}