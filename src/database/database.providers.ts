import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        url: 'mysql2://b1e9c0add1e6cd:43877499@us-cdbr-east-06.cleardb.net/heroku_2008010f68e1244?reconnect=true',
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