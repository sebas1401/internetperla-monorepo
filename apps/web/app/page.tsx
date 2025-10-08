import Link from 'next/link';
import { Button, Card } from '@internetperla/ui';

export default function Page() {
  return (
    <main>
      <h1>InternetPerla Dashboard</h1>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <Card title="Attendance">
          <p>Salud del módulo de asistencia</p>
          <Link href="/attendance"><Button>Ver</Button></Link>
        </Card>
        <Card title="Inventory">
          <p>Salud del módulo de inventario</p>
          <Link href="/inventory"><Button>Ver</Button></Link>
        </Card>
        <Card title="Tasks">
          <p>Salud del módulo de tareas</p>
          <Link href="/tasks"><Button>Ver</Button></Link>
        </Card>
        <Card title="Payroll">
          <p>Salud del módulo de planilla</p>
          <Link href="/payroll"><Button>Ver</Button></Link>
        </Card>
      </div>
    </main>
  );
}

