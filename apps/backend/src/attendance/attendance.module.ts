import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceService } from './attendance.service.js';
import { Employee } from '../entities/employee.entity.js';
import { AttendanceRecord } from '../entities/attendance-record.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, AttendanceRecord])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
