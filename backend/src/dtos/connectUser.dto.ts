import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectUserDTO {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
