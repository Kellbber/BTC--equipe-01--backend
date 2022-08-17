import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultModule } from './consult/consult.module';
import { InstitutionModule } from './institution/institution.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    InstitutionModule,
    StudentsModule,
    ConsultModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
