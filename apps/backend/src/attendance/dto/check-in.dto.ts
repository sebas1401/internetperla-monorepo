import { IsUUID, IsIn, IsOptional, IsNumber, IsString } from 'class-validator';

export class CheckInDto {
  @IsUUID()
  employeeId!: string;

  @IsIn(['IN', 'OUT'])
  type!: 'IN' | 'OUT';

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsString()
  note?: string;
}

