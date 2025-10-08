async function getHealth() {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api/v1';
  const res = await fetch(`${base}/attendance/health`, { cache: 'no-store' });
  return res.json();
}

export default async function AttendancePage() {
  const data = await getHealth();
  return (
    <main>
      <h2>Attendance Health</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}

