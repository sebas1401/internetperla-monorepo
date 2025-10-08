import 'dotenv/config';
import dataSource from './data-source.js';
import { Employee } from '../entities/employee.entity.js';
import { AttendanceRecord } from '../entities/attendance-record.entity.js';

async function main() {
  await dataSource.initialize();

  const employees = dataSource.getRepository(Employee);
  const records = dataSource.getRepository(AttendanceRecord);

  // ... tu lógica de inserción ...

  await dataSource.destroy();
}

main().catch(async (e) => {
  console.error(e);
  try { await dataSource.destroy(); } catch {}
  process.exit(1);
});
