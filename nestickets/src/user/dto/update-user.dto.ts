import { Concert } from "src/concert/schemas/concert.schema";
import { Band } from "src/band/schemas/band.schema";

export class UpdateUserDto {
  username: string;

  firstname: string;

  lastname: string;

  email: string;

  password: string;

  is_admin: boolean;

  tickets: Concert[];

  favorite_bands: Band[];
}
