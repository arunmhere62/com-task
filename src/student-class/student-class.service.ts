import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';

@Injectable()
export class StudentClassService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentClassDto: CreateStudentClassDto) {
    try {
      return await this.prisma.studentClass.create({
        data: createStudentClassDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Class with this unique field already exists.');
      }
      throw new InternalServerErrorException('Failed to create class', error?.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.studentClass.findMany({
        include: { students: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch classes', error?.message);
    }
  }

  async findOne(id: number) {
    try {
      const studentClass = await this.prisma.studentClass.findUnique({
        where: { id },
        include: { students: true },
      });
      if (!studentClass) {
        throw new NotFoundException(`StudentClass with ID ${id} not found`);
      }
      return studentClass;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch class', error?.message);
    }
  }

  async update(id: number, updateStudentClassDto: UpdateStudentClassDto) {
    try {
      return await this.prisma.studentClass.update({
        where: { id },
        data: updateStudentClassDto,
        include: { students: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`StudentClass with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to update class', error?.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.studentClass.delete({
        where: { id },
        include: { students: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`StudentClass with ID ${id} not found`);
      } else if (error.code === 'P2003') {
        throw new BadRequestException(
          'Cannot delete class with existing students. Please remove all students first.',
        );
      }
      throw new InternalServerErrorException('Failed to delete class', error?.message);
    }
  }
}
