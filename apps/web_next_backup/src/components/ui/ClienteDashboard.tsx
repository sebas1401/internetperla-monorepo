import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback } from "./avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { toast } from "sonner";
import {
  Wifi,
  DollarSign,
  FileText,
  MessageSquare,
  Bell,
  LogOut,
  Download,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface ClienteDashboardProps {
  userData: any;
  onLogout: () => void;
}

const facturas = [
  { id: 1, mes: "Octubre 2025", monto: 45.0, vencimiento: "2025-10-15", estado: "Pendiente" },
  { id: 2, mes: "Septiembre 2025", monto: 45.0, vencimiento: "2025-09-15", estado: "Pagado" },
  { id: 3, mes: "Agosto 2025", monto: 45.0, vencimiento: "2025-08-15", estado: "Pagado" },
  { id: 4, mes: "Julio 2025", monto: 45.0, vencimiento: "2025-07-15", estado: "Pagado" },
];

const tickets = [
  {
    id: 1,
    asunto: "Lentitud en conexión",
    fecha: "2025-10-10",
    estado: "En proceso",
    prioridad: "Media",
  },
  {
    id: 2,
    asunto: "Solicitud de cambio de plan",
    fecha: "2025-10-05",
    estado: "Cerrado",
    prioridad: "Baja",
  },
  { id: 3, asunto: "Sin servicio", fecha: "2025-09-28", estado: "Resuelto", prioridad: "Alta" },
];

export function ClienteDashboard({ userData, onLogout }: ClienteDashboardProps) {
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const handleCreateTicket = () => {
    toast.success("Ticket creado", {
      description: "Tu solicitud ha sido registrada. Te contactaremos pronto.",
    });
    setShowTicketDialog(false);
  };

  const handlePagarFactura = () => {
    toast.success("Pago procesado", {
      description: "Tu pago se procesará en las próximas 24 horas",
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
              <p className="text-xs text-muted-foreground">Portal de Clientes</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-muted-foreground">Cliente #12345</p>
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
            <h2 className="text-2xl font-bold">Hola, {userData.name} 👋</h2>
            <p className="text-muted-foreground">Gestiona tu servicio de Internet</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estado del Servicio</CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="font-medium">Activo</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">100 Mbps</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próximo Pago</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45.00</div>
                <p className="text-xs text-muted-foreground">Vence: 15/10/2025</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">En proceso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consumo del Mes</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245 GB</div>
                <p className="text-xs text-muted-foreground">Ilimitado</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="servicio" className="space-y-4">
            <TabsList>
              <TabsTrigger value="servicio">Mi Servicio</TabsTrigger>
              <TabsTrigger value="facturas">Facturas</TabsTrigger>
              <TabsTrigger value="soporte">Soporte</TabsTrigger>
              <TabsTrigger value="perfil">Mi Perfil</TabsTrigger>
            </TabsList>

            {/* Servicio Tab */}
            <TabsContent value="servicio" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Plan Actual</CardTitle>
                    <CardDescription>Detalles de tu plan de Internet</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Plan</span>
                        <span className="font-medium">Internet 100 Mbps</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Velocidad</span>
                        <span className="font-medium">100 Mbps</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Precio</span>
                        <span className="font-medium">$45.00/mes</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Estado</span>
                        <Badge className="bg-[#22C55E] hover:bg-[#22C55E]/90">Activo</Badge>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Cambiar Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Información de Instalación</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Dirección</Label>
                      <p className="font-medium">Av. Principal 123, Lima</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Fecha de Instalación</Label>
                      <p className="font-medium">15 de Enero, 2024</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Router</Label>
                      <p className="font-medium">TP-Link Archer C6</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Número de Contrato</Label>
                      <p className="font-medium font-mono">CON-2024-12345</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Planes Disponibles</CardTitle>
                  <CardDescription>Actualiza tu plan según tus necesidades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">Internet 50 Mbps</h4>
                          <p className="text-sm text-muted-foreground">Ideal para uso básico</p>
                        </div>
                        <div className="text-2xl font-bold">
                          $35<span className="text-sm font-normal text-muted-foreground">/mes</span>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>✓ 50 Mbps de velocidad</li>
                          <li>✓ Ilimitado</li>
                          <li>✓ Router incluido</li>
                        </ul>
                        <Button variant="outline" className="w-full">
                          Seleccionar
                        </Button>
                      </div>
                    </div>

                    <div className="border-2 border-primary rounded-lg p-4 relative">
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        Plan Actual
                      </Badge>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">Internet 100 Mbps</h4>
                          <p className="text-sm text-muted-foreground">Perfecto para familias</p>
                        </div>
                        <div className="text-2xl font-bold">
                          $45<span className="text-sm font-normal text-muted-foreground">/mes</span>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>✓ 100 Mbps de velocidad</li>
                          <li>✓ Ilimitado</li>
                          <li>✓ Router Premium</li>
                        </ul>
                        <Button className="w-full" disabled>
                          Plan Activo
                        </Button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">Internet 200 Mbps</h4>
                          <p className="text-sm text-muted-foreground">Máxima velocidad</p>
                        </div>
                        <div className="text-2xl font-bold">
                          $65<span className="text-sm font-normal text-muted-foreground">/mes</span>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>✓ 200 Mbps de velocidad</li>
                          <li>✓ Ilimitado</li>
                          <li>✓ Router Premium + Extensor</li>
                        </ul>
                        <Button variant="outline" className="w-full">
                          Actualizar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Facturas Tab */}
            <TabsContent value="facturas" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Mis Facturas</CardTitle>
                    <CardDescription>Historial de pagos y facturas pendientes</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Todas
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Período</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Vencimiento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {facturas.map((factura) => (
                        <TableRow key={factura.id}>
                          <TableCell className="font-medium">{factura.mes}</TableCell>
                          <TableCell>${factura.monto.toFixed(2)}</TableCell>
                          <TableCell>{factura.vencimiento}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                factura.estado === "Pendiente"
                                  ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
                                  : "bg-[#22C55E] hover:bg-[#22C55E]/90"
                              }
                            >
                              {factura.estado}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              {factura.estado === "Pendiente" && (
                                <Button size="sm" onClick={handlePagarFactura}>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Pagar
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Total Pagado (2025)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$450.00</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Facturas Pagadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#22C55E]">9</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Próximo Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#F59E0B]">$45.00</div>
                    <p className="text-xs text-muted-foreground mt-1">15/10/2025</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Soporte Tab */}
            <TabsContent value="soporte" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Tickets de Soporte</h3>
                  <p className="text-sm text-muted-foreground">Tus solicitudes de ayuda</p>
                </div>
                <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Nuevo Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Ticket de Soporte</DialogTitle>
                      <DialogDescription>Describe tu problema o consulta</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Asunto</Label>
                        <Textarea placeholder="¿En qué podemos ayudarte?" rows={4} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowTicketDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateTicket}>Crear Ticket</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium">{ticket.asunto}</h4>
                            <p className="text-sm text-muted-foreground">
                              Ticket #{ticket.id} · {ticket.fecha}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              variant="outline"
                              className={
                                ticket.prioridad === "Alta"
                                  ? "border-destructive text-destructive"
                                  : ticket.prioridad === "Media"
                                    ? "border-[#F59E0B] text-[#F59E0B]"
                                    : ""
                              }
                            >
                              {ticket.prioridad}
                            </Badge>
                            <Badge
                              className={
                                ticket.estado === "En proceso"
                                  ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
                                  : ticket.estado === "Resuelto" || ticket.estado === "Cerrado"
                                    ? "bg-[#22C55E] hover:bg-[#22C55E]/90"
                                    : ""
                              }
                            >
                              {ticket.estado}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/50">
                <CardHeader>
                  <CardTitle className="text-base">Contacto Directo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+51 987 654 321</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <p className="text-sm text-muted-foreground">soporte@internetperla.com</p>
                    </div>
                  </div>
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
                      <Label className="text-sm text-muted-foreground">Email</Label>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Teléfono</Label>
                      <p className="font-medium">+51 987 654 321</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">DNI</Label>
                      <p className="font-medium">12345678</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Dirección</Label>
                      <p className="font-medium">Av. Principal 123, Lima</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Cliente desde</Label>
                      <p className="font-medium">15 de Enero, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline">Editar Información</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
