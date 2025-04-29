import { Body,Controller,Post,Get } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private usersService :UserService){}

    @Post()
    create(@Body () createUserDto: createUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
