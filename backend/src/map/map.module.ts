import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { marcadoresProviders } from './map.providers';

@Module({
  controllers: [MapController],
  providers: [MapService, ...marcadoresProviders],
})
export class MapModule {}
