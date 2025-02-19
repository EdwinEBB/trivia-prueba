import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

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
    login(@Body() logindto:LoginDto){
        return this.authservice.Login(logindto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    gerprofile(@Request() req){
        return req.usuario
    }

}
