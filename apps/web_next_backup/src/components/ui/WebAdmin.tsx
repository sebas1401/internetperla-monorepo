import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback } from "./avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./dialog";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Textarea } from "./textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Clock,
  DollarSign,
  Package,
  Users,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Plus,
  Download,
  Filter,
  Eye,
  HelpCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { day: "Lun", asistencias: 28 },
  { day: "Mar", asistencias: 32 },
  { day: "Mié", asistencias: 29 },
  { day: "Jue", asistencias: 31 },
  { day: "Vie", asistencias: 30 },
  { day: "Sáb", asistencias: 24 },
  { day: "Dom", asistencias: 18 },
];

const actividades = [
  {
    id: 1,
    tecnico: "Juan Pérez",
    tipo: "Instalación",
    cliente: "Carlos Ruiz",
    estado: "En curso",
    hora: "09:30",
  },
  {
    id: 2,
    tecnico: "María García",
    tipo: "Mantenimiento",
    cliente: "Ana López",
    estado: "Completado",
    hora: "08:15",
  },
  {
    id: 3,
    tecnico: "Pedro Sánchez",
    tipo: "Instalación",
    cliente: "Luis Martínez",
    estado: "Pendiente",
    hora: "11:00",
  },
  {
    id: 4,
    tecnico: "Ana Torres",
    tipo: "Soporte",
    cliente: "Rosa Fernández",
    estado: "En curso",
    hora: "10:45",
  },
];

const asistencias = [
  {
    id: 1,
    empleado: "Juan Pérez",
    tipo: "IN",
    hora: "08:00:23",
    nota: "Entrada normal",
    lat: "-12.0464",
    lng: "-77.0428",
  },
  {
    id: 2,
    empleado: "María García",
    tipo: "IN",
    hora: "07:55:12",
    nota: "Entrada anticipada",
    lat: "-12.0464",
    lng: "-77.0428",
  },
  {
    id: 3,
    empleado: "Pedro Sánchez",
    tipo: "IN",
    hora: "08:10:45",
    nota: "Entrada con retraso",
    lat: "-12.0464",
    lng: "-77.0428",
  },
  {
    id: 4,
    empleado: "Ana Torres",
    tipo: "OUT",
    hora: "18:05:33",
    nota: "Salida normal",
    lat: "-12.0464",
    lng: "-77.0428",
  },
];

const nomina = [
  {
    id: 1,
    empleado: "Juan Pérez",
    cargo: "Técnico",
    salario: 1500,
    bonos: 200,
    deducciones: 150,
    estado: "Pagado",
  },
  {
    id: 2,
    empleado: "María García",
    cargo: "Técnico",
    salario: 1500,
    bonos: 250,
    deducciones: 150,
    estado: "Pagado",
  },
  {
    id: 3,
    empleado: "Pedro Sánchez",
    cargo: "Técnico",
    salario: 1500,
    bonos: 180,
    deducciones: 150,
    estado: "Pendiente",
  },
  {
    id: 4,
    empleado: "Ana Torres",
    cargo: "Supervisor",
    salario: 2000,
    bonos: 300,
    deducciones: 200,
    estado: "Pagado",
  },
];

const deudas = [
  { id: 1, empleado: "Juan Pérez", monto: 1000, saldo: 600, fecha: "2024-05-15", estado: "Activo" },
  {
    id: 2,
    empleado: "Pedro Sánchez",
    monto: 1500,
    saldo: 1200,
    fecha: "2024-06-01",
    estado: "Activo",
  },
  {
    id: 3,
    empleado: "María García",
    monto: 800,
    saldo: 0,
    fecha: "2024-03-10",
    estado: "Liquidado",
  },
];

const inventario = [
  { categoria: "Routers", stock: 45, minimo: 20, alerta: false },
  { categoria: "ONT", stock: 12, minimo: 15, alerta: true },
  { categoria: "Antenas", stock: 28, minimo: 10, alerta: false },
  { categoria: "Cables (metros)", stock: 350, minimo: 100, alerta: false },
];

const movimientos = [
  {
    id: 1,
    fecha: "2024-10-11",
    item: "Router TP-Link",
    empleado: "Juan Pérez",
    tipo: "Salida",
    cantidad: 2,
    nota: "Instalación cliente #234",
  },
  {
    id: 2,
    fecha: "2024-10-11",
    item: "ONT Huawei",
    empleado: "María García",
    tipo: "Salida",
    cantidad: 1,
    nota: "Instalación cliente #235",
  },
  {
    id: 3,
    fecha: "2024-10-10",
    item: "Router TP-Link",
    empleado: "Almacén",
    tipo: "Entrada",
    cantidad: 10,
    nota: "Compra mensual",
  },
];

interface WebAdminProps {
  onLogout?: () => void;
}

export function WebAdmin({ onLogout }: WebAdminProps = {}) {
  const [currentModule, setCurrentModule] = useState<
    "dashboard" | "asistencia" | "pagos" | "inventario" | "tecnicos"
  >("dashboard");
  const [showManualAttendance, setShowManualAttendance] = useState(false);
  const [showNewMovement, setShowNewMovement] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold">IP</span>
            </div>
            <div>
              <h2 className="font-bold">InternetPerla</h2>
              <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "asistencia", icon: Clock, label: "Asistencia" },
            { id: "pagos", icon: DollarSign, label: "Pagos/Deudas" },
            { id: "inventario", icon: Package, label: "Inventario" },
            { id: "tecnicos", icon: Users, label: "Técnicos/Actividades" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentModule(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentModule === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
            <Settings className="h-5 w-5" />
            <span>Configuración</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Sábado, 11 de Octubre 2025</div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {currentModule === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1>Dashboard</h1>
                <p className="text-muted-foreground">Vista general del sistema</p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Empleados Activos</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-[#22C55E]">+2</span> desde el mes pasado
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Asistencias Hoy</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18/24</div>
                    <p className="text-xs text-muted-foreground">IN: 18 · OUT: 12</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-[#F59E0B]">3 urgentes</span>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Instalaciones Hoy</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">2 completadas</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Asistencias - Últimos 7 días</CardTitle>
                  <CardDescription>Registro de entradas y salidas del personal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="day" stroke="#64748B" />
                        <YAxis stroke="#64748B" />
                        <RechartsTooltip />
                        <Line
                          type="monotone"
                          dataKey="asistencias"
                          stroke="#0EA5E9"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Activities Table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Actividades Hoy</CardTitle>
                    <CardDescription>Tareas programadas y en progreso</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver todas
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Técnico</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {actividades.map((act) => (
                        <TableRow key={act.id}>
                          <TableCell>{act.tecnico}</TableCell>
                          <TableCell>{act.tipo}</TableCell>
                          <TableCell>{act.cliente}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                act.estado === "Completado"
                                  ? "default"
                                  : act.estado === "En curso"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                act.estado === "Completado"
                                  ? "bg-[#22C55E] hover:bg-[#22C55E]/90"
                                  : act.estado === "En curso"
                                    ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
                                    : ""
                              }
                            >
                              {act.estado}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{act.hora}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {currentModule === "asistencia" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1>Asistencia</h1>
                  <p className="text-muted-foreground">
                    Control de entradas y salidas del personal
                  </p>
                </div>
                <Dialog open={showManualAttendance} onOpenChange={setShowManualAttendance}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Registrar Manual
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Asistencia Manual</DialogTitle>
                      <DialogDescription>Ingresa los datos de la asistencia</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Empleado</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar empleado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Juan Pérez</SelectItem>
                            <SelectItem value="2">María García</SelectItem>
                            <SelectItem value="3">Pedro Sánchez</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in">Entrada (IN)</SelectItem>
                            <SelectItem value="out">Salida (OUT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Nota</Label>
                        <Textarea placeholder="Razón del registro manual..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowManualAttendance(false)}>
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => {
                          toast.success("Asistencia registrada", {
                            description: "La asistencia manual ha sido registrada exitosamente",
                          });
                          setShowManualAttendance(false);
                        }}
                      >
                        Registrar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Fecha Inicio</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Fecha Fin</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Empleado</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="1">Juan Pérez</SelectItem>
                          <SelectItem value="2">María García</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="in">IN</SelectItem>
                          <SelectItem value="out">OUT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button>
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Table */}
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Nota</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asistencias.map((asist) => (
                        <TableRow key={asist.id}>
                          <TableCell>{asist.empleado}</TableCell>
                          <TableCell>
                            <Badge variant={asist.tipo === "IN" ? "default" : "secondary"}>
                              {asist.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell>{asist.hora}</TableCell>
                          <TableCell className="text-muted-foreground">{asist.nota}</TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">
                            {asist.lat}, {asist.lng}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {currentModule === "pagos" && (
            <div className="space-y-6">
              <div>
                <h1>Pagos y Deudas</h1>
                <p className="text-muted-foreground">Gestión de nómina y préstamos</p>
              </div>

              <Tabs defaultValue="nomina">
                <TabsList>
                  <TabsTrigger value="nomina">Nómina</TabsTrigger>
                  <TabsTrigger value="deudas">Préstamos/Deudas</TabsTrigger>
                </TabsList>

                <TabsContent value="nomina" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nómina del Personal</CardTitle>
                      <CardDescription>Salarios, bonos y deducciones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Salario Base</TableHead>
                            <TableHead>Bonos</TableHead>
                            <TableHead>Deducciones</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {nomina.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.empleado}</TableCell>
                              <TableCell className="text-muted-foreground">{item.cargo}</TableCell>
                              <TableCell>${item.salario}</TableCell>
                              <TableCell className="text-[#22C55E]">+${item.bonos}</TableCell>
                              <TableCell className="text-destructive">
                                -${item.deducciones}
                              </TableCell>
                              <TableCell className="font-medium">
                                ${item.salario + item.bonos - item.deducciones}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    item.estado === "Pagado"
                                      ? "bg-[#22C55E] hover:bg-[#22C55E]/90"
                                      : "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
                                  }
                                >
                                  {item.estado}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  Historial
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="deudas" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Préstamos y Deudas</CardTitle>
                      <CardDescription>Control de préstamos al personal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Monto Original</TableHead>
                            <TableHead>Saldo Pendiente</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {deudas.map((deuda) => (
                            <TableRow key={deuda.id}>
                              <TableCell>{deuda.empleado}</TableCell>
                              <TableCell>${deuda.monto}</TableCell>
                              <TableCell className="font-medium">${deuda.saldo}</TableCell>
                              <TableCell className="text-muted-foreground">{deuda.fecha}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    deuda.estado === "Liquidado"
                                      ? "bg-[#22C55E] hover:bg-[#22C55E]/90"
                                      : "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
                                  }
                                >
                                  {deuda.estado}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {deuda.estado === "Activo" && (
                                  <Button variant="outline" size="sm">
                                    Liquidar
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentModule === "inventario" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1>Inventario</h1>
                  <p className="text-muted-foreground">Control de equipos y materiales</p>
                </div>
                <Dialog open={showNewMovement} onOpenChange={setShowNewMovement}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Movimiento
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Movimiento</DialogTitle>
                      <DialogDescription>
                        Ingresa los detalles del movimiento de inventario
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Tipo de movimiento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entrada">Entrada</SelectItem>
                            <SelectItem value="salida">Salida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Item</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="router">Router TP-Link</SelectItem>
                            <SelectItem value="ont">ONT Huawei</SelectItem>
                            <SelectItem value="antena">Antena</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Cantidad</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label>Nota</Label>
                        <Textarea placeholder="Descripción del movimiento..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNewMovement(false)}>
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => {
                          toast.success("Movimiento registrado", {
                            description: "El movimiento de inventario ha sido registrado",
                          });
                          setShowNewMovement(false);
                        }}
                      >
                        Registrar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stock Cards */}
              <div className="grid grid-cols-4 gap-4">
                {inventario.map((item, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{item.categoria}</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-muted-foreground hover:text-foreground">
                                <HelpCircle className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Stock actual vs. mínimo requerido</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">{item.stock}</span>
                          <span className="text-sm text-muted-foreground">unidades</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Mínimo: {item.minimo}
                          </span>
                          {item.alerta && (
                            <Badge variant="destructive" className="text-xs">
                              Stock bajo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Movements Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Movimientos Recientes</CardTitle>
                  <CardDescription>Entradas y salidas de inventario</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Nota</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {movimientos.map((mov) => (
                        <TableRow key={mov.id}>
                          <TableCell className="text-muted-foreground">{mov.fecha}</TableCell>
                          <TableCell>{mov.item}</TableCell>
                          <TableCell>{mov.empleado}</TableCell>
                          <TableCell>
                            <Badge variant={mov.tipo === "Entrada" ? "default" : "secondary"}>
                              {mov.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell>{mov.cantidad}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {mov.nota}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {currentModule === "tecnicos" && (
            <div className="space-y-6">
              <div>
                <h1>Técnicos y Actividades</h1>
                <p className="text-muted-foreground">Gestión de tareas y calendario</p>
              </div>

              <Tabs defaultValue="lista">
                <TabsList>
                  <TabsTrigger value="lista">Lista de Tareas</TabsTrigger>
                  <TabsTrigger value="calendario">
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendario
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="lista" className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="outline">Todas (12)</Badge>
                    <Badge variant="outline">Pendiente (5)</Badge>
                    <Badge variant="outline">En curso (4)</Badge>
                    <Badge variant="outline">Completado (3)</Badge>
                  </div>

                  <div className="grid gap-4">
                    {actividades.map((tarea) => (
                      <Card key={tarea.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center gap-3">
                                <Badge
                                  className={
                                    tarea.estado === "Completado"
                                      ? "bg-[#22C55E] hover:bg-[#22C55E]/90"
                                      : tarea.estado === "En curso"
                                        ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
                                        : ""
                                  }
                                >
                                  {tarea.estado}
                                </Badge>
                                <Badge variant="outline">{tarea.tipo}</Badge>
                              </div>
                              <div>
                                <h4 className="font-medium">{tarea.cliente}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Asignado a: {tarea.tecnico}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {tarea.hora}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  Ver ubicación
                                </div>
                              </div>
                            </div>
                            <Button variant="outline">Ver Detalle</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="calendario">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="h-96 flex items-center justify-center text-muted-foreground">
                        Vista de calendario (próximamente)
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
