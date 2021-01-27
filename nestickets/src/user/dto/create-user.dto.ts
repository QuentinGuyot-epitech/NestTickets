import { Concert } from "src/concert/schemas/concert.schema";
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Band } from "src/band/schemas/band.schema";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    
    is_admin: boolean;

    tickets: Concert[];

    favorite_bands: Band[];

    // readonly favorite_bands: Band;
}
