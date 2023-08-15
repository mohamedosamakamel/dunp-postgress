import { Test, TestingModule } from '@nestjs/testing';
import { BuckupService } from './buckup.service';

describe('BuckupService', () => {
  let service: BuckupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuckupService],
    }).compile();

    service = module.get<BuckupService>(BuckupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
