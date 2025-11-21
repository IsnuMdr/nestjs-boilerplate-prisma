import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  readonly password!: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  readonly password_confirmation!: string;
}
