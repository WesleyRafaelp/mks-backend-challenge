import { DataSource } from "typeorm";
import { Actor } from "./entities/cast.entity";

export const castProviders = [
    {
      provide: 'ACTOR_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Actor),
      inject: ['DATA_SOURCE'],
    },
  ];