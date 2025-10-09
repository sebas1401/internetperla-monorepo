import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn } from 'typeorm';
import { Employee } from './employee.entity.js';

export type AttendanceType = 'IN' | 'OUT';

@Entity('attendance_record')
@Index('IDX_attendance_timestamp', ['timestamp'])
export class AttendanceRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Employee, (employee: Employee) => employee.attendanceRecords, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Index('IDX_attendance_employee')
  employee!: Employee;

  @Column({ type: 'varchar', length: 3 })
  type!: AttendanceType;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  timestamp!: Date;

  @Column({ type: 'double precision', nullable: true })
  lat?: number | null;

  @Column({ type: 'double precision', nullable: true })
  lng?: number | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;
}

