import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FetchService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [FetchService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "No Route."', () => {
      expect(appController.returnNoRoute()).toBe('No Route.');
    });
  });
});
