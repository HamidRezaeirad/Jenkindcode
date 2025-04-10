import { Injectable } from '@nestjs/common';
import { SynonymEntity } from '../entities/synonym-entity';
import { AddWordDto } from '../models/add-word.dto';

@Injectable()
/**
 * Service to manage synonyms for words.
 * It maintains a map where each word is associated with a set of its synonyms.
 */
export class SynonymsService {
  private synonymMap: Map<string, Set<string>> = new Map();

  /**
   * Adds a word and its synonyms to the synonym map.
   * If the word or any of its synonyms do not exist in the map, they are added.
   * The method also ensures that the synonym relationship is bidirectional and applies transitive rules.
   *
   * @param addWordDto - Data transfer object containing the word and its synonyms.
   */
  addWord(addWordDto: AddWordDto): void {
    const { word, synonyms } = addWordDto;
    if (!this.synonymMap.has(word)) {
      this.synonymMap.set(word, new Set());
    }

    synonyms.forEach((synonym) => {
      if (!this.synonymMap.has(synonym)) {
        this.synonymMap.set(synonym, new Set());
      }

      this.synonymMap.get(word)?.add(synonym);
      this.synonymMap.get(synonym)?.add(word);
    });

    this.applyTransitiveRule(word, this.synonymMap.get(word) || new Set());
  }

  /**
   * Retrieves the synonyms for a given word.
   *
   * @param word - The word for which synonyms are to be retrieved.
   * @returns An object containing an array of synonyms for the given word.
   */
  getSynonyms(word: string): SynonymEntity {
    return { synonyms: Array.from(this.synonymMap.get(word) || []) };
  }

  /**
   * Applies the transitive rule to ensure that all synonyms of a word are mutually recognized as synonyms.
   * This method updates the synonym map to reflect the transitive closure of the synonym relationship.
   *
   * @param word - The word for which the transitive rule is to be applied.
   * @param synonyms - The set of synonyms associated with the word.
   */
  private applyTransitiveRule(word: string, synonyms: Set<string>): void {
    synonyms.add(word);
    synonyms.forEach((synonym) => {
      this.synonymMap.set(synonym, synonyms);
    });
  }
}
