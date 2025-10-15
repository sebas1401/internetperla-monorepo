import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback } from "./avatar";
import { Switch } from "./switch";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { Onboarding } from "./Onboarding";
import { toast } from "sonner";
import {
  Home,
  ClipboardList,
  Clock,
  Package,
  User,
  MapPin,
  Phone,
  CheckCircle2,
  Camera,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  LogOut,
  ExternalLink,
  Plus,
} from "lucide-react";

const tareas = [
  {
    id: 1,
    cliente: "Carlos Ruiz",
    direccion: "Av. Principal 123",
    tipo: "Instalación",
    estado: "Pendiente",
    hora: "09:30",
  },
  {
    id: 2,
    cliente: "Ana López",
    direccion: "Calle 45 #234",
    tipo: "Mantenimiento",
    estado: "En curso",
    hora: "11:00",
  },
  {
    id: 3,
    cliente: "Luis Martínez",
    direccion: "Jr. Lima 567",
    tipo: "Soporte",
    estado: "Completado",
    hora: "14:00",
  },
];

const inventarioTecnico = [
  { id: 1, item: "Router TP-Link", cantidad: 3 },
  { id: 2, item: "ONT Huawei", cantidad: 2 },
  { id: 3, item: "Cable UTP (metros)", cantidad: 50 },
  { id: 4, item: "Conectores RJ45", cantidad: 20 },
];

export function MobileApp() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<
    "login" | "home" | "tareas" | "detalle" | "asistencia" | "inventario" | "perfil"
  >("login");
  const [currentTab, setCurrentTab] = useState<
    "home" | "tareas" | "asistencia" | "inventario" | "perfil"
  >("home");
  const [asistenciaStatus, setAsistenciaStatus] = useState<"OUT" | "IN">("OUT");
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = () => {
    setCurrentScreen("home");
    setCurrentTab("home");
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleTabChange = (tab: "home" | "tareas" | "asistencia" | "inventario" | "perfil") => {
    setCurrentTab(tab);
    setCurrentScreen(tab);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 p-8">
      {/* Mobile Frame */}
      <div className="relative">
        {/* Device Frame */}
        <div className="w-[375px] h-[812px] bg-card border-8 border-secondary rounded-[3rem] shadow-2xl overflow-hidden relative">
          {/* Status Bar */}
          {currentScreen !== "login" && (
            <div className="h-11 bg-card border-b border-border px-6 flex items-center justify-between text-xs">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-3 border border-foreground rounded-sm" />
                <div className="w-4 h-3 border border-foreground rounded-sm" />
                <div className="w-4 h-3 border border-foreground rounded-sm" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="h-[calc(100%-44px)] overflow-auto">
            {showOnboarding && currentScreen === "login" && (
              <Onboarding onComplete={handleCompleteOnboarding} />
            )}

            {!showOnboarding && currentScreen === "login" && (
              <div className="h-full flex flex-col items-center justify-center p-6 space-y-8">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-4">
                    <span className="text-primary-foreground text-2xl font-bold">IP</span>
                  </div>
                  <h2 className="text-2xl font-bold">InternetPerla</h2>
                  <p className="text-sm text-muted-foreground">App Técnicos</p>
                </div>

                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="tecnico@internetperla.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contraseña</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                      Recordar sesión
                    </Label>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleLogin}>
                  Iniciar Sesión
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  ¿Olvidaste tu contraseña?
                </p>
              </div>
            )}

            {currentScreen === "home" && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Hola, Juan 👋</h2>
                  <p className="text-sm text-muted-foreground">Sábado, 11 de Octubre</p>
                </div>

                {/* Quick Status */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-[#22C55E]" />
                        </div>
                        <div>
                          <p className="font-medium">Asistencia Activa</p>
                          <p className="text-xs text-muted-foreground">Entrada: 08:00 AM</p>
                        </div>
                      </div>
                      <Badge className="bg-[#22C55E] hover:bg-[#22C55E]/90">IN</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Tasks */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3>Próximas Tareas</h3>
                    <Button variant="ghost" size="sm" onClick={() => handleTabChange("tareas")}>
                      Ver todas
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {tareas.slice(0, 3).map((tarea) => (
                      <Card key={tarea.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-medium">{tarea.cliente}</p>
                              <p className="text-xs text-muted-foreground">{tarea.direccion}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                tarea.estado === "Completado"
                                  ? "border-[#22C55E] text-[#22C55E]"
                                  : tarea.estado === "En curso"
                                    ? "border-[#F59E0B] text-[#F59E0B]"
                                    : ""
                              }
                            >
                              {tarea.estado}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {tarea.hora}
                            </span>
                            <span className="flex items-center gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {tarea.tipo}
                              </Badge>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => handleTabChange("asistencia")}
                    >
                      <Clock className="h-5 w-5" />
                      <span className="text-xs">Asistencia</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => handleTabChange("inventario")}
                    >
                      <Package className="h-5 w-5" />
                      <span className="text-xs">Inventario</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentScreen === "tareas" && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Tareas</h2>
                  <p className="text-sm text-muted-foreground">Tus actividades del día</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <Badge variant="default">Todas (8)</Badge>
                  <Badge variant="outline">Pendiente (3)</Badge>
                  <Badge variant="outline">En curso (2)</Badge>
                  <Badge variant="outline">Completado (3)</Badge>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                  {tareas.map((tarea) => (
                    <Card
                      key={tarea.id}
                      onClick={() => setCurrentScreen("detalle")}
                      className="cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{tarea.cliente}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  tarea.estado === "Completado"
                                    ? "border-[#22C55E] text-[#22C55E]"
                                    : tarea.estado === "En curso"
                                      ? "border-[#F59E0B] text-[#F59E0B]"
                                      : ""
                                }
                              >
                                {tarea.estado}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                              <MapPin className="h-3 w-3" />
                              {tarea.direccion}
                            </p>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-xs">
                                {tarea.tipo}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {tarea.hora}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentScreen === "detalle" && (
              <div className="h-full flex flex-col">
                <div className="p-6 space-y-6 flex-1 overflow-auto">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("tareas")}>
                      ← Atrás
                    </Button>
                    <Badge className="bg-[#F59E0B] hover:bg-[#F59E0B]/90">En curso</Badge>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-1">Ana López</h2>
                    <Badge variant="secondary">Mantenimiento</Badge>
                  </div>

                  {/* Client Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Información del Cliente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Calle 45 #234, Lima</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>+51 987 654 321</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Programado: 11:00 AM</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Abrir en Maps
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Checklist */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Checklist</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check1" defaultChecked />
                        <Label htmlFor="check1" className="text-sm">
                          Verificar conexión de fibra
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check2" defaultChecked />
                        <Label htmlFor="check2" className="text-sm">
                          Revisar ONT
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check3" />
                        <Label htmlFor="check3" className="text-sm">
                          Probar velocidad
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check4" />
                        <Label htmlFor="check4" className="text-sm">
                          Obtener firma del cliente
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Photos */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Fotos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square rounded-lg border border-dashed border-border flex items-center justify-center">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="aspect-square rounded-lg border border-dashed border-border flex items-center justify-center">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="aspect-square rounded-lg border border-dashed border-border flex items-center justify-center">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Notas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input placeholder="Agregar nota..." />
                    </CardContent>
                  </Card>
                </div>

                <div className="p-6 border-t border-border bg-card">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      toast.success("Tarea completada exitosamente", {
                        description: "Se ha notificado al sistema",
                      });
                      setTimeout(() => setCurrentScreen("tareas"), 1500);
                    }}
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Marcar como Completada
                  </Button>
                </div>
              </div>
            )}

            {currentScreen === "asistencia" && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Asistencia</h2>
                  <p className="text-sm text-muted-foreground">Control de entrada y salida</p>
                </div>

                {/* Status Card */}
                <Card className="border-2 border-primary">
                  <CardContent className="p-6 text-center space-y-4">
                    <div
                      className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
                        asistenciaStatus === "IN" ? "bg-[#22C55E]/10" : "bg-muted"
                      }`}
                    >
                      <Clock
                        className={`h-10 w-10 ${
                          asistenciaStatus === "IN" ? "text-[#22C55E]" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado Actual</p>
                      <Badge
                        className={
                          asistenciaStatus === "IN" ? "bg-[#22C55E] hover:bg-[#22C55E]/90" : ""
                        }
                      >
                        {asistenciaStatus === "IN" ? "Entrada Registrada" : "Fuera de Servicio"}
                      </Badge>
                    </div>
                    {asistenciaStatus === "IN" ? (
                      <Button
                        size="lg"
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          setAsistenciaStatus("OUT");
                          toast.success("Salida registrada", {
                            description: "18:05:33 · GPS activado",
                          });
                        }}
                      >
                        Registrar Salida
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => {
                          setAsistenciaStatus("IN");
                          toast.success("Entrada registrada", {
                            description: "08:00:23 · GPS activado",
                          });
                        }}
                      >
                        Registrar Entrada
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Last Entry */}
                {asistenciaStatus === "IN" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Última Marcación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tipo</span>
                        <Badge className="bg-[#22C55E] hover:bg-[#22C55E]/90">Entrada</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Hora</span>
                        <span className="text-sm font-medium">08:00:23 AM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Ubicación</span>
                        <span className="text-xs font-mono">-12.0464, -77.0428</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Info */}
                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground text-center">
                      La marcación de asistencia utiliza tu ubicación GPS. Asegúrate de tener el GPS
                      activado.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentScreen === "inventario" && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Mi Inventario</h2>
                  <p className="text-sm text-muted-foreground">Items asignados</p>
                </div>

                {/* Inventory Items */}
                <div className="space-y-3">
                  {inventarioTecnico.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.item}</p>
                              <p className="text-xs text-muted-foreground">Asignado</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">{item.cantidad}</p>
                            <p className="text-xs text-muted-foreground">unidades</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Request Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast.success("Solicitud enviada", {
                      description: "El almacén procesará tu solicitud",
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Solicitar Reposición
                </Button>

                {/* Info */}
                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground text-center">
                      Solicita reposición cuando tus items estén por agotarse. El almacén procesará
                      tu solicitud en 24-48 horas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentScreen === "perfil" && (
              <div className="p-6 space-y-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarFallback className="text-xl">JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">Juan Pérez</h2>
                    <p className="text-sm text-muted-foreground">Técnico de Campo</p>
                    <Badge variant="outline" className="mt-2">
                      ID: T-001
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Productividad Semanal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">12</p>
                        <p className="text-xs text-muted-foreground">Completadas</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#F59E0B]">3</p>
                        <p className="text-xs text-muted-foreground">En curso</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">95%</p>
                        <p className="text-xs text-muted-foreground">Efectividad</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Ajustes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        <Label>Modo Oscuro</Label>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5" />
                        <Label>Notificaciones</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => setCurrentScreen("login")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation - Only show when logged in and not in detail view */}
          {currentScreen !== "login" && currentScreen !== "detalle" && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-card border-t border-border">
              <div className="flex items-center justify-around h-full px-2">
                {[
                  { id: "home", icon: Home, label: "Inicio" },
                  { id: "tareas", icon: ClipboardList, label: "Tareas" },
                  { id: "asistencia", icon: Clock, label: "Asistencia" },
                  { id: "inventario", icon: Package, label: "Inventario" },
                  { id: "perfil", icon: User, label: "Perfil" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as any)}
                    className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                      currentTab === tab.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="text-xs">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Device Label */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <p className="text-xs text-muted-foreground">iPhone 14 Pro · 375×812</p>
        </div>
      </div>
    </div>
  );
}
