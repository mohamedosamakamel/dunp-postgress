import { Test, TestingModule } from '@nestjs/testing';
import { BuckupController } from './buckup.controller';
import { BuckupService } from './buckup.service';

describe('BuckupController', () => {
  let controller: BuckupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuckupController],
      providers: [BuckupService],
    }).compile();

    controller = module.get<BuckupController>(BuckupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
