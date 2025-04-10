import { Module } from '@nestjs/common';
import { SynonymsController } from './synonyms.controller';
import { SynonymsService } from './synonyms.service';

@Module({
  controllers: [SynonymsController],
  providers: [SynonymsService],
})
export class SynonymsModule {}
