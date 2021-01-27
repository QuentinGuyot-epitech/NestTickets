import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Concert, ConcertSchema } from './schemas/concert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
  ],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
