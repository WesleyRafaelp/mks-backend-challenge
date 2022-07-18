import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'us-cdbr-east-06.cleardb.net', 
        port: 3306,
        username: 'b1e9c0add1e6cd',
        password: '43877499',
        database: 'heroku_2008010f68e1244',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];