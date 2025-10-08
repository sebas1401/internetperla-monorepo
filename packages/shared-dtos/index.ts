export interface User { id: string; email: string; roles: string[] }
export interface AttendanceRecord { id: string; employeeId: string; type: 'IN'|'OUT'; timestamp: string }
export interface InventoryItem { id: string; sku: string; name: string }

