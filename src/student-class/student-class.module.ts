import { Module } from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { StudentClassController } from './student-class.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentClassController],
  providers: [StudentClassService],
  exports: [StudentClassService],
})
export class StudentClassModule {}
