import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) for adding a new word.
 * This class is used to validate the input data when adding a new word and its synonyms.
 */
export class AddWordDto {
  /**
   * The word to be added.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  word: string;

  /**
   * A list of synonyms for the word.
   * @type {string[]}
   */
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  synonyms: string[];
}
