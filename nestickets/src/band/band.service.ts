import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBandDto } from './dto/create-band.dto';
import { Band, BandDocument } from './schemas/band.schema';

@Injectable()
export class BandService {
  constructor(
    @InjectModel('Band')
    private readonly bandModel: Model<BandDocument>,
  ) {}

  async findAll(): Promise<Band[]> {
    return await this.bandModel.find();
  }

  async findOne(id: string): Promise<Band> {
    return await this.bandModel.findOne({ _id: id });
  }

  async create(createBandDto: CreateBandDto): Promise<Band> {
    const newBand = new this.bandModel(createBandDto);
    return await newBand.save();
  }

  async delete(id: string): Promise<Band> {
    return await this.bandModel.findByIdAndRemove(id);
  }

  async update(id: string,createBandDto: CreateBandDto,): Promise<Band> {
    return await this.bandModel.findByIdAndUpdate(id, createBandDto, { new: true, });
  }
}