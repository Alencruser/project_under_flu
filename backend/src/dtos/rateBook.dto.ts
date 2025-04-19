import { IsNotEmpty, IsNumber } from 'class-validator';

export class RateBookDTO {
  @IsNotEmpty()
  @IsNumber()
  rating!: number;
}
