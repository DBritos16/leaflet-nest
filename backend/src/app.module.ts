import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MapModule } from './map/map.module';
import { DatabaseModule } from './db/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    DatabaseModule,
    MapModule,      
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
