import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { CheckInDto } from './dto/check-in.dto.js';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Get('health')
  health() {
    return this.service.health();
  }

  @Post('check')
  check(@Body() dto: CheckInDto) {
    return this.service.check(dto);
  }

  @Get('records')
  records(
    @Query('employeeId') employeeId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;
    return this.service.findRecords(employeeId, fromDate, toDate);
  }
}

