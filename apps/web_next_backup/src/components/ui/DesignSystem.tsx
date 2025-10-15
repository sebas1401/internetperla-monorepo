import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Checkbox } from "./checkbox";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Switch } from "./switch";
import { Badge } from "./badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Label } from "./label";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Loader2, Search, Settings, Check } from "lucide-react";

export function DesignSystem() {
  return (
    <div className="w-full min-h-screen bg-muted/30 p-8">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">InternetPerla Design System</h1>
          <p className="text-muted-foreground">Sistema de diseño para plataforma de gestión ISP</p>
        </div>

        {/* Brand Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Paleta de Colores</CardTitle>
            <CardDescription>Colores principales del sistema InternetPerla</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Primary & Secondary */}
            <div>
              <h3 className="mb-4">Primarios y Secundarios</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-24 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-mono">#0EA5E9</span>
                  </div>
                  <p className="text-sm">Primary</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-lg bg-secondary flex items-center justify-center">
                    <span className="text-secondary-foreground font-mono">#0F172A</span>
                  </div>
                  <p className="text-sm">Secondary</p>
                </div>
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h3 className="mb-4">Colores Semánticos</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#22C55E" }}
                  >
                    <span className="text-white font-mono">#22C55E</span>
                  </div>
                  <p className="text-sm">Success</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <span className="text-white font-mono">#F59E0B</span>
                  </div>
                  <p className="text-sm">Warning</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-destructive flex items-center justify-center">
                    <span className="text-destructive-foreground font-mono">#EF4444</span>
                  </div>
                  <p className="text-sm">Error</p>
                </div>
              </div>
            </div>

            {/* Neutrals */}
            <div>
              <h3 className="mb-4">Neutros</h3>
              <div className="grid grid-cols-6 gap-2">
                {[
                  { label: "950", color: "#0B1220" },
                  { label: "900", color: "#0F172A" },
                  { label: "700", color: "#334155" },
                  { label: "400", color: "#94A3B8" },
                  { label: "100", color: "#E2E8F0" },
                  { label: "50", color: "#F1F5F9" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div
                      className="h-16 rounded-md border border-border flex items-end p-2"
                      style={{ backgroundColor: item.color }}
                    >
                      <span
                        className="text-xs font-mono"
                        style={{ color: parseInt(item.label) > 400 ? "white" : "black" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Tipografía</CardTitle>
            <CardDescription>Inter - Sistema tipográfico base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <h1>Heading 1 - El título más importante</h1>
                <p className="text-sm text-muted-foreground font-mono">H1 · 2xl · Medium</p>
              </div>
              <div className="space-y-1">
                <h2>Heading 2 - Subtítulos principales</h2>
                <p className="text-sm text-muted-foreground font-mono">H2 · xl · Medium</p>
              </div>
              <div className="space-y-1">
                <h3>Heading 3 - Secciones importantes</h3>
                <p className="text-sm text-muted-foreground font-mono">H3 · lg · Medium</p>
              </div>
              <div className="space-y-1">
                <h4>Heading 4 - Subsecciones</h4>
                <p className="text-sm text-muted-foreground font-mono">H4 · base · Medium</p>
              </div>
              <div className="space-y-1">
                <p>Body - Texto estándar para párrafos y contenido general del sistema.</p>
                <p className="text-sm text-muted-foreground font-mono">P · base · Regular</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Small - Texto secundario y metadatos
                </p>
                <p className="text-sm text-muted-foreground font-mono">Small · sm · Regular</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Caption - Notas y timestamps</p>
                <p className="text-sm text-muted-foreground font-mono">Caption · xs · Regular</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spacing */}
        <Card>
          <CardHeader>
            <CardTitle>Sistema de Espaciado</CardTitle>
            <CardDescription>8pt system - Escala basada en múltiplos de 8</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { size: "4px", label: "xs" },
                { size: "8px", label: "sm" },
                { size: "12px", label: "base" },
                { size: "16px", label: "md" },
                { size: "24px", label: "lg" },
                { size: "32px", label: "xl" },
                { size: "48px", label: "2xl" },
              ].map((spacing) => (
                <div key={spacing.label} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-muted-foreground font-mono">{spacing.size}</div>
                  <div className="h-8 bg-primary rounded" style={{ width: spacing.size }} />
                  <div className="text-sm text-muted-foreground">{spacing.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Variantes, tamaños y estados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Variants */}
            <div>
              <h4 className="mb-4">Variantes</h4>
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="mb-4">Tamaños</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h4 className="mb-4">Con Iconos</h4>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
                <Button variant="secondary">
                  Guardar
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="mb-4">Estados</h4>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card>
          <CardHeader>
            <CardTitle>Componentes de Formulario</CardTitle>
            <CardDescription>Inputs, selects y controles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Input</Label>
                <Input placeholder="Escribe algo..." />
              </div>
              <div className="space-y-2">
                <Label>Input con error</Label>
                <Input placeholder="email@ejemplo.com" className="border-destructive" />
                <p className="text-sm text-destructive">Email inválido</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Textarea</Label>
              <Textarea placeholder="Escribe un comentario..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Select</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Opción 1</SelectItem>
                  <SelectItem value="option2">Opción 2</SelectItem>
                  <SelectItem value="option3">Opción 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="check1" defaultChecked />
                <Label htmlFor="check1">Checkbox seleccionado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check2" />
                <Label htmlFor="check2">Checkbox sin seleccionar</Label>
              </div>
            </div>

            <RadioGroup defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="r1" />
                <Label htmlFor="r1">Opción 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="r2" />
                <Label htmlFor="r2">Opción 2</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center space-x-2">
              <Switch id="switch" defaultChecked />
              <Label htmlFor="switch">Switch activado</Label>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Chips */}
        <Card>
          <CardHeader>
            <CardTitle>Badges y Tags</CardTitle>
            <CardDescription>Indicadores de estado y categorías</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge className="bg-[#22C55E] text-white hover:bg-[#22C55E]/90">Éxito</Badge>
              <Badge className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90">Alerta</Badge>
              <Badge className="bg-primary text-primary-foreground">Info</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Other Components */}
        <Card>
          <CardHeader>
            <CardTitle>Otros Componentes</CardTitle>
            <CardDescription>Avatars, cards y más</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="mb-4">Avatars</h4>
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div>
              <h4 className="mb-4">Card Example</h4>
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>Título del Card</CardTitle>
                  <CardDescription>Descripción breve del contenido</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Este es un ejemplo de card con header y contenido.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Border Radius */}
        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
            <CardDescription>Radios de borde del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-primary rounded-sm" />
                <p className="text-xs text-muted-foreground">sm (4px)</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-primary rounded-md" />
                <p className="text-xs text-muted-foreground">md (6px)</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-primary rounded-lg" />
                <p className="text-xs text-muted-foreground">lg (8px)</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-primary rounded-xl" />
                <p className="text-xs text-muted-foreground">xl (12px)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
