import { Test, TestingModule } from '@nestjs/testing';
import { AddWordDto } from '../models/add-word.dto';
import { SynonymsService } from './synonyms.service';

describe('SynonymsService', () => {
  let service: SynonymsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SynonymsService],
    }).compile();

    service = module.get<SynonymsService>(SynonymsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('SynonymsService', () => {
  let service: SynonymsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SynonymsService],
    }).compile();

    service = module.get<SynonymsService>(SynonymsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a word with its synonyms', () => {
    const addWordDto: AddWordDto = {
      word: 'happy',
      synonyms: ['joyful', 'cheerful'],
    };
    service.addWord(addWordDto);
    const synonyms = service.getSynonyms('happy');
    expect(synonyms.synonyms).toEqual(
      expect.arrayContaining(['joyful', 'cheerful']),
    );
  });

  it('should return synonyms for a given word', () => {
    const addWordDto: AddWordDto = {
      word: 'sad',
      synonyms: ['unhappy', 'sorrowful'],
    };
    service.addWord(addWordDto);
    const synonyms = service.getSynonyms('sad');
    expect(synonyms.synonyms).toEqual(
      expect.arrayContaining(['unhappy', 'sorrowful']),
    );
  });

  it('should apply transitive rule to ensure all synonyms are connected', () => {
    const addWordDto1: AddWordDto = { word: 'fast', synonyms: ['quick'] };
    const addWordDto2: AddWordDto = { word: 'quick', synonyms: ['speedy'] };
    service.addWord(addWordDto1);
    service.addWord(addWordDto2);
    const synonyms = service.getSynonyms('fast');
    expect(synonyms.synonyms).toEqual(
      expect.arrayContaining(['quick', 'speedy']),
    );
  });
});
