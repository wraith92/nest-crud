import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma :PrismaService){}

    async createUser(createUserDto: CreateUserDto ){
        return this.prisma.user.create({
            data:createUserDto,
        })
    }
    async findByEmail(email:string){
        return this.prisma.user.findUnique({where :{email}})
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true
                // Exclure les champs sensibles comme le mot de passe
            }
        });
    }
}
