import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { SynonymsController } from '../src//synonyms/synonyms.controller';
import { SynonymsService } from '../src//synonyms/synonyms.service';
import { AppModule } from '../src/app.module';

describe('Synonyms API End-to-End Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [SynonymsController],
      providers: [SynonymsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should add word and synonyms for a given word', async () => {
    const response = await request(app.getHttpServer())
      .post('/synonyms/add')
      .send({
        word: 'Wash',
        synonyms: ['Clean', 'Dirty'],
      })
      .set('Content-Type', 'application/json')
      .expect(201);

    expect(response.text).toBe('Synonyms for "Wash" added successfully.');
  });

  it('should return synonyms for a given word', async () => {
    await request(app.getHttpServer())
      .post('/synonyms/add')
      .send({
        word: 'Wash',
        synonyms: ['Clean', 'Dirty'],
      })
      .set('Content-Type', 'application/json')
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/synonyms/lookup?word=Wash')
      .expect(200);
    expect(response.body).toHaveProperty('synonyms');
    expect(response.body.synonyms).toContain('Clean');
  });

  it('should return 400 for missing word parameter', async () => {
    await request(app.getHttpServer()).get('/synonyms/lookup').expect(400);
  });

  it('should return 404 for a word with no synonyms', async () => {
    const response = await request(app.getHttpServer())
      .get('/synonyms/lookup?word=nonexistentword')
      .expect(200);

    expect(response.body).toHaveProperty('synonyms');
  });
});
