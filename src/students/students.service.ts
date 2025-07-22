import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      return await this.prisma.student.create({
        data: createStudentDto,
        include: { studentClass: true },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Unique constraint failed
        throw new BadRequestException('Student with this unique field already exists.');
      }
      throw new InternalServerErrorException('Failed to create student', error?.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.student.findMany({
        include: { studentClass: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch students', error?.message);
    }
  }

  async findOne(id: number) {
    try {
      const student = await this.prisma.student.findUnique({
        where: { id },
        include: { studentClass: true },
      });
      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      return student;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch student', error?.message);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      return await this.prisma.student.update({
        where: { id },
        data: updateStudentDto,
        include: { studentClass: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.student.delete({
        where: { id },
        include: { studentClass: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      throw error;
    }
  }
}
