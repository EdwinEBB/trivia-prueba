import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice:AuthService
    ){}

    @Post('register')
    register(@Body() registerdto:RegisterDto) {
        console.log(registerdto)

        return this.authservice.register(registerdto)
    }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ValidationPipe({transform:true}))
    async login(@Body() logindto:LoginDto, @Res() res:Response){
        console.log('Datos recibidos en login:', logindto);
        const {access_token}= await this.authservice.Login(logindto);
        
        res.cookie('access_token', access_token,{
            httpOnly:true,
            secure:process.env.Node_ENV === 'production',
            sameSite:'strict',
            maxAge:3600000
        });

        return res.send({message:'Login exitoso'})


    }

    @Get('profile')
    gerprofile(@Request() req){
        return req.usuario
    }

}
