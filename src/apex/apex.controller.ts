import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApexService } from './apex.service';

@Controller('apex')
@UseGuards(AuthGuard('jwt'))
export class ApexController {
  constructor(private readonly apexService: ApexService) {}

  @Get('stats')
  async getStats(
    @Query('platform') platform: number,
    @Query('username') username: string
  ) {
    return this.apexService.getPlayerStats(platform, username);
  }
}