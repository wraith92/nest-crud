import { Body,Controller,Post,Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private usersService :UserService){}

    @Post()
    create(@Body () createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
