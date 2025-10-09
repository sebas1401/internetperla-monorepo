import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import type { AttendanceRecord } from './attendance-record.entity.js';

export type EmployeeRole = 'admin' | 'empleado' | 'tecnico';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100 })
  lastName!: string;

  @Index('UQ_employee_email', { unique: true })
  @Column({ type: 'varchar', length: 160 })
  email!: string;

  @Column({ type: 'varchar', length: 20 })
  role!: EmployeeRole;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToMany('AttendanceRecord', (record: AttendanceRecord) => record.employee)
  attendanceRecords!: Relation<AttendanceRecord[]>;
}
