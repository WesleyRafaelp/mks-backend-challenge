import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { DatabaseModule } from 'src/database/database.module';
import { castProviders } from './cast.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CastController],
  providers: [CastService, ...castProviders,]
})
export class CastModule {}
