import { Module } from '@nestjs/common';
import config from './config/keys';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertModule } from './concert/concert.module';
import { UserModule } from './user/user.module';
import { BandModule } from './band/band.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), ConcertModule, UserModule, BandModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
