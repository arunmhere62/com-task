import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ description: 'First name of the student', example: 'John', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ description: 'Last name of the student', example: 'Doe', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ 
    description: 'Roll number of the student', 
    example: 'R001',
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  rollNo: string;

  @ApiProperty({ 
    description: 'Email of the student', 
    example: 'john.doe@example.com',
    maxLength: 150
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @ApiProperty({ 
    description: 'ID of the class the student belongs to', 
    example: 1 
  })
  @IsInt()
  @IsNotEmpty()
  classId: number;

  @ApiProperty({ 
    description: 'Gender of the student',
    enum: Gender,
    example: Gender.Male,
    default: Gender.Other
  })
  @ApiProperty({ enum: Gender, required: true })
  @IsEnum(Gender)
  gender: Gender;
}
