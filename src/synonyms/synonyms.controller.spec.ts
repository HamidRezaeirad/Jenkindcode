import { Test, TestingModule } from '@nestjs/testing';
import { SynonymEntity } from '../entities/synonym-entity';
import { AddWordDto } from '../models/add-word.dto';
import { SynonymsController } from './synonyms.controller';
import { SynonymsService } from './synonyms.service';

describe('SynonymsController', () => {
  let controller: SynonymsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SynonymsController],
      providers: [SynonymsService],
    }).compile();

    controller = module.get<SynonymsController>(SynonymsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
describe('SynonymsController', () => {
  let controller: SynonymsController;
  let service: SynonymsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SynonymsController],
      providers: [
        {
          provide: SynonymsService,
          useValue: {
            addWord: jest.fn(),
            getSynonyms: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SynonymsController>(SynonymsController);
    service = module.get<SynonymsService>(SynonymsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addWord', () => {
    it('should call synonymsService.addWord with correct parameters', () => {
      const addWordDto: AddWordDto = {
        word: 'test',
        synonyms: ['exam', 'trial'],
      };
      controller.addWord(addWordDto);
      expect(service.addWord).toHaveBeenCalledWith(addWordDto);
    });

    it('should return a success message', () => {
      const addWordDto: AddWordDto = {
        word: 'test',
        synonyms: ['exam', 'trial'],
      };
      const result = controller.addWord(addWordDto);
      expect(result).toBe('Synonyms for "test" added successfully.');
    });
  });

  describe('getSynonyms', () => {
    it('should call synonymsService.getSynonyms with correct parameters', () => {
      const word = 'test';
      controller.getSynonyms(word);
      expect(service.getSynonyms).toHaveBeenCalledWith(word);
    });

    it('should return synonyms for the given word', () => {
      const word = 'test';
      const synonyms: SynonymEntity = { synonyms: ['exam', 'trial'] };
      jest.spyOn(service, 'getSynonyms').mockReturnValue(synonyms);
      const result = controller.getSynonyms(word);
      expect(result).toBe(synonyms);
    });
  });
});
