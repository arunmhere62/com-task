import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentClassService } from './student-class.service';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';

@ApiTags('student-classes')
@Controller('student-classes')
export class StudentClassController {
  constructor(private readonly studentClassService: StudentClassService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student class' })
  @ApiResponse({ status: 201, description: 'Class successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createStudentClassDto: CreateStudentClassDto) {
    return this.studentClassService.create(createStudentClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all student classes' })
  @ApiResponse({ status: 200, description: 'Return all classes.' })
  findAll() {
    return this.studentClassService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a class by ID' })
  @ApiResponse({ status: 200, description: 'Return the class.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentClassService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a class' })
  @ApiResponse({ status: 200, description: 'Class updated successfully.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentClassDto: UpdateStudentClassDto,
  ) {
    return this.studentClassService.update(id, updateStudentClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class' })
  @ApiResponse({ status: 200, description: 'Class deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  @ApiResponse({ status: 400, description: 'Cannot delete class with students.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentClassService.remove(id);
  }
}
