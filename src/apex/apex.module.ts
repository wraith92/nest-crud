import { Module } from '@nestjs/common';
import { ApexController } from './apex.controller';
import { ApexService } from './apex.service';

@Module({
  controllers: [ApexController],
  providers: [ApexService]
})
export class ApexModule {}