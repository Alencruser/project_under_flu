import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  author!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/\d{4}-\d{2}-\d{2}/)
  published_date!: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  cover?: string;
}
