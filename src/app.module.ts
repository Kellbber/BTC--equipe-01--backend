import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultModule } from './consult/consult.module';
import { InstitutionModule } from './institution/institution.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';
import { join } from 'path';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [
    PrismaModule,
    UserModule,
    InstitutionModule,
    StudentsModule,
    ConsultModule,
    AuthModule,
    MailerModule.forRoot({
transport:{
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6ca5f027911b44",
    pass: "ca02a5262ac8f0"
  }
},
template:{
  dir: join(__dirname, 'mails'),
  adapter: new HandlebarsAdapter()
}

    })
  ],
  controllers: [AppController, EmailController],
  providers: [AppService],
})
export class AppModule {}
