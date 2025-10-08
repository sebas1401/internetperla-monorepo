async function getHealth() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api/v1';
    const res = await fetch(`${base}/inventory/health`, { cache: 'no-store' });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  } catch (e) {
    return { status: 'unavailable' };
  }
}

export default async function InventoryPage() {
  const data = await getHealth();
  return (
    <main>
      <h2>Inventory Health</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
