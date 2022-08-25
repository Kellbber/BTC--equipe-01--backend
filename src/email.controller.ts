import { Controller, Query, Get, Post, Body } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer'


@Controller('email')
export class EmailController {
  constructor(private mailService:MailerService){}

  @Get('plain-text-email')
  async plainTextEmail(@Query('toemail')toemail){
    await this.mailService.sendMail({
      to: toemail,
      from: "colunareta87@gmail.com",
      subject: 'email de criação do usuário',
      text: 'clique no link para se cadastrar -> http://localhost:3000/criarusuario',
    });
    return 'success';
  }

  @Post('html-email')
   async postHtmlEmail(@Body()payload){
    this.mailService.sendMail({
      to: payload.toemail,
      from:'colunareta87@gmail.com',
      subject:'email de criação do usuário',
      template: 'template',
      context:{
        name: payload
      }
    })
    return 'success'
  }
}

