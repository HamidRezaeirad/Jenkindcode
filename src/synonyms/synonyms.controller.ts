import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { SynonymEntity } from '../entities/synonym-entity';
import { AddWordDto } from '../models/add-word.dto';
import { SynonymsService } from './synonyms.service';

/**
 * Controller for managing synonyms.
 */
@Controller('synonyms')
export class SynonymsController {
  /**
   * Creates an instance of SynonymsController.
   * @param synonymsService - The service used to manage synonyms.
   */
  constructor(private readonly synonymsService: SynonymsService) {}

  /**
   * Adds a new word and its synonyms.
   * @param addWordDto - The data transfer object containing the word and its synonyms.
   * @returns A success message indicating the word and its synonyms were added.
   */
  @Post('add')
  addWord(@Body() addWordDto: AddWordDto): string {
    this.synonymsService.addWord(addWordDto);
    return `Synonyms for "${addWordDto.word}" added successfully.`;
  }

  /**
   * Retrieves synonyms for a given word.
   * @param word - The word to look up synonyms for.
   * @returns The synonyms for the specified word.
   */
  @Get('lookup')
  getSynonyms(@Query('word') word: string): SynonymEntity {
    if (!word) {
      throw new BadRequestException('Missing word parameter');
    }
    return this.synonymsService.getSynonyms(word);
  }
}
