import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateBookDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  author!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  published_date!: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  cover?: string;
}
