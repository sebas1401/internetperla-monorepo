import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Checkbox } from "./checkbox";
import { toast } from "sonner";
import { Shield, Briefcase, User } from "lucide-react";

interface LoginProps {
  onLogin: (userType: "admin" | "empleado" | "cliente", userData: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (userType: "admin" | "empleado" | "cliente") => {
    if (!email || !password) {
      toast.error("Error de validación", {
        description: "Por favor completa todos los campos",
      });
      return;
    }

    setIsLoading(true);

    // Simular autenticación
    setTimeout(() => {
      const userData = {
        email,
        name:
          userType === "admin"
            ? "Administrador"
            : userType === "empleado"
              ? "Juan Pérez"
              : "Carlos Ruiz",
        userType,
      };

      toast.success("Inicio de sesión exitoso", {
        description: `Bienvenido ${userData.name}`,
      });

      onLogin(userType, userData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <span className="text-3xl font-bold text-primary-foreground">IP</span>
          </div>
          <h1 className="text-3xl font-bold text-white">InternetPerla</h1>
          <p className="text-white/60 mt-2">Sistema de Gestión ISP</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Selecciona tu tipo de acceso</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="admin" className="flex flex-col gap-1 h-auto py-3">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Admin</span>
                </TabsTrigger>
                <TabsTrigger value="empleado" className="flex flex-col gap-1 h-auto py-3">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-xs">Empleado</span>
                </TabsTrigger>
                <TabsTrigger value="cliente" className="flex flex-col gap-1 h-auto py-3">
                  <User className="h-4 w-4" />
                  <span className="text-xs">Cliente</span>
                </TabsTrigger>
              </TabsList>

              {["admin", "empleado", "cliente"].map((type) => (
                <TabsContent key={type} value={type} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`email-${type}`}>Correo Electrónico</Label>
                    <Input
                      id={`email-${type}`}
                      type="email"
                      placeholder={
                        type === "admin"
                          ? "admin@internetperla.com"
                          : type === "empleado"
                            ? "empleado@internetperla.com"
                            : "cliente@ejemplo.com"
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`password-${type}`}>Contraseña</Label>
                    <Input
                      id={`password-${type}`}
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLogin(type as any);
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`remember-${type}`}
                        checked={remember}
                        onCheckedChange={(checked) => setRemember(checked as boolean)}
                        disabled={isLoading}
                      />
                      <Label htmlFor={`remember-${type}`} className="text-sm cursor-pointer">
                        Recordarme
                      </Label>
                    </div>
                    <button className="text-sm text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => handleLogin(type as any)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>

                  {type === "cliente" && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        ¿No tienes cuenta?{" "}
                        <button className="text-primary hover:underline">Regístrate aquí</button>
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2025 InternetPerla. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
