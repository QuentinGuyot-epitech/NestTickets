import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert, ConcertDocument } from './schemas/concert.schema';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel('Concert')
    private readonly concertModel: Model<ConcertDocument>,
  ) {}

  async findAll(): Promise<Concert[]> {
    return await this.concertModel.find().sort({ start_datetime: 'asc' });
  }

  async findOne(id: string): Promise<Concert> {
    return await this.concertModel.findOne({ _id: id });
  }

  async create(createConcertDto: CreateConcertDto): Promise<Concert> {
    const newConcert = new this.concertModel(createConcertDto);
    return await newConcert.save();
  }

  async delete(id: string): Promise<Concert> {
    return await this.concertModel.findByIdAndRemove(id);
  }

  async update(id: string,createConcertDto: CreateConcertDto,): Promise<Concert> {
    return await this.concertModel.findByIdAndUpdate(id, createConcertDto, { new: true, });
  }
}