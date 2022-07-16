import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'us-cdbr-east-06.cleardb.net', 
        port: 3306,
        username: 'b8c66d0e60e4fc',
        password: '763d8948',
        database: 'heroku_4341986e5ee966c',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];