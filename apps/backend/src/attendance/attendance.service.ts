import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity.js';
import { AttendanceRecord } from '../entities/attendance-record.entity.js';
import { CheckInDto } from './dto/check-in.dto.js';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(AttendanceRecord) private readonly attendanceRepo: Repository<AttendanceRecord>,
  ) {}

  health() {
    return { status: 'ok' } as const;
  }

  async check(dto: CheckInDto) {
    const employee = await this.employeeRepo.findOne({ where: { id: dto.employeeId } });
    if (!employee) throw new NotFoundException('Employee not found');

    const last = await this.attendanceRepo
      .createQueryBuilder('r')
      .leftJoin('r.employee', 'e')
      .where('e.id = :id', { id: employee.id })
      .orderBy('r.timestamp', 'DESC')
      .getOne();

    if (last && last.type === 'IN' && dto.type === 'IN') {
      throw new BadRequestException('Consecutive IN not allowed');
    }

    const record = this.attendanceRepo.create({
      employee,
      type: dto.type,
      lat: dto.lat,
      lng: dto.lng,
      note: dto.note,
    });
    return this.attendanceRepo.save(record);
  }

  async findRecords(employeeId?: string, from?: Date, to?: Date) {
    const qb = this.attendanceRepo
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.employee', 'e')
      .orderBy('r.timestamp', 'DESC');

    if (employeeId) qb.andWhere('e.id = :employeeId', { employeeId });
    if (from) qb.andWhere('r.timestamp >= :from', { from });
    if (to) qb.andWhere('r.timestamp <= :to', { to });

    return qb.getMany();
  }
}

