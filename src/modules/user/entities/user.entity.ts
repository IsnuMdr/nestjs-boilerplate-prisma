import { Exclude } from 'class-transformer';
import { $Enums, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class UserEntity implements User {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'Email address of the user', format: 'email' })
  email: string;

  @ApiProperty({ description: 'Full name of the user' })
  name: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: $Enums.UserRole,
    example: $Enums.UserRole.admin,
  })
  role: $Enums.UserRole;

  @ApiProperty({ description: 'Indicates if the user account is active' })
  is_active: boolean;

  @ApiProperty({ description: 'Timestamp when the user was created', type: String, format: 'date-time' })
  created_at: Date;

  @ApiProperty({ description: 'Timestamp when the user was last updated', type: String, format: 'date-time' })
  updated_at: Date;

  @ApiProperty({ description: 'Timestamp of the user\'s last login', type: String, format: 'date-time', nullable: true })
  last_login: Date;

  @ApiProperty({ description: 'ID of the division the user belongs to', nullable: true })
  division_id: string;

  @ApiProperty({ description: 'ID of the company the user belongs to' })
  company_id: string;

  @Exclude()
  @ApiProperty({ description: 'Hashed password of the user', writeOnly: true, type: String })
  password: string;

  // Assuming createdAt and updatedAt are aliases or duplicates of created_at/updated_at
  // If they are separate fields, they should also have @ApiProperty.
  // For now, I'll exclude them from explicit ApiProperty to avoid redundancy if they map to the same DB columns
  // as created_at/updated_at from Prisma's User type.
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
