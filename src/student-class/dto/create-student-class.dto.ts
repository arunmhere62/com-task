import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength, Matches } from 'class-validator';

export class CreateStudentClassDto {
  @ApiProperty({ 
    description: 'Name of the class', 
    example: 'Computer Science 101',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ 
    description: 'Unique key for the class (alphanumeric and underscores only)', 
    example: 'CS101',
    maxLength: 50,
    minLength: 2,
    pattern: '^[A-Za-z0-9_]+$'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Za-z0-9_]+$/, {
    message: 'Class key must contain only letters, numbers, and underscores',
  })
  classKey: string;
}
