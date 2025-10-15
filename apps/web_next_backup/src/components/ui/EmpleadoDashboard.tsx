import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback } from "./avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Progress } from "./progress";
import { Label } from "./label";
import { toast } from "sonner";
import {
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Bell,
  LogOut,
  MapPin,
  Calendar,
  Award,
  FileText,
} from "lucide-react";

interface EmpleadoDashboardProps {
  userData: any;
  onLogout: () => void;
}

const tareasPendientes = [
  {
    id: 1,
    cliente: "Carlos Ruiz",
    direccion: "Av. Principal 123",
    tipo: "Instalación",
    hora: "09:30",
    prioridad: "Alta",
  },
  {
    id: 2,
    cliente: "Ana López",
    direccion: "Calle 45 #234",
    tipo: "Mantenimiento",
    hora: "11:00",
    prioridad: "Media",
  },
  {
    id: 3,
    cliente: "Luis Martínez",
    direccion: "Jr. Lima 567",
    tipo: "Soporte",
    hora: "14:00",
    prioridad: "Baja",
  },
];

const asistenciaHistorial = [
  { fecha: "2025-10-11", entrada: "08:00:23", salida: "18:05:33", horas: "10h 5m" },
  { fecha: "2025-10-10", entrada: "07:55:12", salida: "18:00:45", horas: "10h 5m" },
  { fecha: "2025-10-09", entrada: "08:10:45", salida: "18:15:20", horas: "10h 4m" },
  { fecha: "2025-10-08", entrada: "08:00:00", salida: "18:02:10", horas: "10h 2m" },
];

export function EmpleadoDashboard({ userData, onLogout }: EmpleadoDashboardProps) {
  const [asistenciaStatus, setAsistenciaStatus] = useState<"IN" | "OUT">("OUT");

  const handleMarcarAsistencia = () => {
    const newStatus = asistenciaStatus === "OUT" ? "IN" : "OUT";
    setAsistenciaStatus(newStatus);

    toast.success(newStatus === "IN" ? "Entrada registrada" : "Salida registrada", {
      description: `${new Date().toLocaleTimeString()} · GPS activado`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">IP</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">InternetPerla</h1>
              <p className="text-xs text-muted-foreground">Portal de Empleados</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-muted-foreground">Técnico de Campo</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Welcome */}
          <div>
            <h2 className="text-2xl font-bold">Bienvenido, {userData.name} 👋</h2>
            <p className="text-muted-foreground">Sábado, 11 de Octubre 2025</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estado Asistencia</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      asistenciaStatus === "IN" ? "bg-[#22C55E] hover:bg-[#22C55E]/90" : ""
                    }
                  >
                    {asistenciaStatus === "IN" ? "Activo" : "Fuera de servicio"}
                  </Badge>
                  <Button size="sm" onClick={handleMarcarAsistencia}>
                    {asistenciaStatus === "OUT" ? "Entrar" : "Salir"}
                  </Button>
                </div>
                {asistenciaStatus === "IN" && (
                  <p className="text-xs text-muted-foreground mt-2">Desde: 08:00 AM</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas Hoy</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">2 completadas · 3 pendientes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productividad</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <Progress value={95} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Salario del Mes</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,750</div>
                <p className="text-xs text-muted-foreground">Salario + Bonos</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="tareas" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tareas">Mis Tareas</TabsTrigger>
              <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
              <TabsTrigger value="nomina">Nómina</TabsTrigger>
              <TabsTrigger value="perfil">Mi Perfil</TabsTrigger>
            </TabsList>

            {/* Tareas Tab */}
            <TabsContent value="tareas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tareas Pendientes</CardTitle>
                  <CardDescription>Actividades programadas para hoy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tareasPendientes.map((tarea) => (
                      <div key={tarea.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{tarea.cliente}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  tarea.prioridad === "Alta"
                                    ? "border-destructive text-destructive"
                                    : tarea.prioridad === "Media"
                                      ? "border-[#F59E0B] text-[#F59E0B]"
                                      : ""
                                }
                              >
                                {tarea.prioridad}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {tarea.direccion}
                            </p>
                          </div>
                          <Badge variant="secondary">{tarea.tipo}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {tarea.hora}
                          </span>
                          <Button size="sm">Ver Detalle</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Asistencia Tab */}
            <TabsContent value="asistencia" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Asistencia</CardTitle>
                  <CardDescription>Registro de entradas y salidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Entrada</TableHead>
                        <TableHead>Salida</TableHead>
                        <TableHead>Horas Trabajadas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asistenciaHistorial.map((registro, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{registro.fecha}</TableCell>
                          <TableCell className="font-mono text-sm">{registro.entrada}</TableCell>
                          <TableCell className="font-mono text-sm">{registro.salida}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{registro.horas}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Horas Semana</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50h 16m</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Horas Mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">180h 45m</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Puntualidad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#22C55E]">98%</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Nómina Tab */}
            <TabsContent value="nomina" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Salarial</CardTitle>
                    <CardDescription>Mes actual: Octubre 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Salario Base</span>
                      <span className="font-medium">$1,500.00</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Bonos</span>
                      <span className="font-medium text-[#22C55E]">+$250.00</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Deducciones</span>
                      <span className="font-medium text-destructive">-$0.00</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-medium">Total a Recibir</span>
                      <span className="text-xl font-bold text-primary">$1,750.00</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bonificaciones</CardTitle>
                    <CardDescription>Incentivos del mes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-[#22C55E]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Productividad</p>
                        <p className="text-xs text-muted-foreground">+95% eficiencia</p>
                      </div>
                      <span className="font-medium text-[#22C55E]">+$150</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Puntualidad</p>
                        <p className="text-xs text-muted-foreground">Sin retrasos</p>
                      </div>
                      <span className="font-medium text-[#22C55E]">+$100</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Historial de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mes</TableHead>
                        <TableHead>Salario Base</TableHead>
                        <TableHead>Bonos</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Septiembre 2025</TableCell>
                        <TableCell>$1,500</TableCell>
                        <TableCell className="text-[#22C55E]">+$200</TableCell>
                        <TableCell className="font-medium">$1,700</TableCell>
                        <TableCell>
                          <Badge className="bg-[#22C55E] hover:bg-[#22C55E]/90">Pagado</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Agosto 2025</TableCell>
                        <TableCell>$1,500</TableCell>
                        <TableCell className="text-[#22C55E]">+$180</TableCell>
                        <TableCell className="font-medium">$1,680</TableCell>
                        <TableCell>
                          <Badge className="bg-[#22C55E] hover:bg-[#22C55E]/90">Pagado</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Perfil Tab */}
            <TabsContent value="perfil" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Nombre Completo</Label>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Cargo</Label>
                      <p className="font-medium">Técnico de Campo</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Email</Label>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Teléfono</Label>
                      <p className="font-medium">+51 987 654 321</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Fecha de Ingreso</Label>
                      <p className="font-medium">15 de Marzo, 2023</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">ID Empleado</Label>
                      <p className="font-medium font-mono">EMP-001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Estadísticas del Mes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tareas Completadas</span>
                      <span className="font-bold">45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Instalaciones</span>
                      <span className="font-bold">28</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Mantenimientos</span>
                      <span className="font-bold">17</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Satisfacción Cliente</span>
                      <span className="font-bold text-[#22C55E]">4.8/5.0</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Reconocimientos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-[#F59E0B]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Empleado del Mes</p>
                        <p className="text-xs text-muted-foreground">Septiembre 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Mejor Técnico</p>
                        <p className="text-xs text-muted-foreground">Julio 2025</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
