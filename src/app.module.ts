import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SynonymsController } from './synonyms/synonyms.controller';
import { SynonymsService } from './synonyms/synonyms.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SynonymsController],
  providers: [AppService, SynonymsService],
})
export class AppModule {}
