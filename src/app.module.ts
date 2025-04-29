import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ApexService } from './apex/apex.service';
import { ApexController } from './apex/apex.controller';
import { ApexModule } from './apex/apex.module';

@Module({
  imports: [UserModule, AuthModule, ApexModule],
  controllers: [AppController, ApexController],
  providers: [AppService, UserService, PrismaService, ApexService],
})
export class AppModule {}
