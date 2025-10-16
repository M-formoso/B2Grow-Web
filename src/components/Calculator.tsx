import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Zap, Sun, Leaf, Battery, Package, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import LaserFlow from "./effects/LaserFlow";

// Definición de tipos de artefactos con valores típicos
const APPLIANCES = {
  "Lámparas": { power: 9, peakPower: 9, usage: 4 },
  "Heladeras": { power: 150, peakPower: 300, usage: 12 },
  "Heladera con Freezer": { power: 200, peakPower: 400, usage: 12 },
  "Freezer": { power: 250, peakPower: 500, usage: 8 },
  "TV": { power: 90, peakPower: 180, usage: 5 },
  "Laptop o PC": { power: 200, peakPower: 300, usage: 6 },
  "Cámaras de seguridad": { power: 15, peakPower: 20, usage: 24 },
  "Alarma": { power: 10, peakPower: 15, usage: 24 },
  "Router WiFi": { power: 12, peakPower: 15, usage: 24 },
  "Portón": { power: 300, peakPower: 800, usage: 0.2 },
  "Cafetera": { power: 900, peakPower: 1200, usage: 0.5 },
  "Aire Acondicionado normal": { power: 1350, peakPower: 2200, usage: 6 },
  "Aire Acondicionado inverter": { power: 877, peakPower: 1400, usage: 6 },
  "Ventilador": { power: 90, peakPower: 150, usage: 10 },
  "Cargador de Herramienta eléctrica": { power: 150, peakPower: 300, usage: 1 },
  "Cargador de celular": { power: 5, peakPower: 10, usage: 3 },
  "Equipo de música": { power: 60, peakPower: 120, usage: 4 },
  "Otros 1": { power: 0, peakPower: 0, usage: 0 },
  "Otros 2": { power: 0, peakPower: 0, usage: 0 },
  "Otros 3": { power: 0, peakPower: 0, usage: 0 },
};

const PROJECT_TYPES = [
  "Uso doméstico",
  "Comercios",
  "Consorcios",
  "Vida al aire libre",
  "Empresas",
  "Otros"
];

interface ApplianceData {
  selected: boolean;
  power: number;
  quantity: number;
  peakPower: number;
  usage: number;
}

interface CalculationResult {
  potenciaNecesaria: number;
  potenciaPico: number;
  autonomiaNecesaria: number;
  panelSolar: number;
  cantPaneles: number;
  necesarioBaterias: number;
  estacionRecomendada: string;
  cantBateriasExtra: number;
}

const Calculator = () => {
  const [projectType, setProjectType] = useState<string>("");
  const [otherProjectType, setOtherProjectType] = useState<string>("");
  const [needsMobileChassis, setNeedsMobileChassis] = useState<boolean>(false);
  const [appliancesExpanded, setAppliancesExpanded] = useState<boolean>(false);
  const [appliances, setAppliances] = useState<Record<string, ApplianceData>>(
    Object.fromEntries(
      Object.entries(APPLIANCES).map(([name, defaults]) => [
        name,
        {
          selected: false,
          power: defaults.power,
          quantity: 1,
          peakPower: defaults.peakPower,
          usage: defaults.usage,
        },
      ])
    )
  );
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleApplianceToggle = (name: string) => {
    setAppliances((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        selected: !prev[name].selected,
      },
    }));
  };

  const handleApplianceChange = (
    name: string,
    field: keyof ApplianceData,
    value: number
  ) => {
    setAppliances((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [field]: value,
      },
    }));
  };

  const calculateResults = () => {
    const selectedAppliances = Object.entries(appliances).filter(
      ([_, data]) => data.selected
    );

    // 1. Potencia necesaria = Σ(Potencia_i × Cantidad_i)
    const potenciaNecesaria = selectedAppliances.reduce(
      (sum, [_, data]) => sum + data.power * data.quantity,
      0
    );

    // 2. Potencia Pico = Σ(Potencia Pico_i × Cantidad_i)
    const potenciaPico = selectedAppliances.reduce(
      (sum, [_, data]) => sum + data.peakPower * data.quantity,
      0
    );

    // 3. Autonomía necesaria = Σ(Uso_i × Potencia_i × Cantidad_i)
    const autonomiaNecesaria = selectedAppliances.reduce(
      (sum, [_, data]) => sum + data.usage * data.power * data.quantity,
      0
    );

    // Constantes
    const HORAS_SOL_PICO = 4;
    const PANEL_SOLAR_CHICO = 200;
    const DOD = 0.8;
    const BATERIA_EXTRA = 2160;
    const BATERIA_BASE = 1037;

    // 4. Panel Solar = Redondear hacia arriba (Autonomía necesaria / Horas Sol Pico / Panel Solar Chico)
    const panelSolar = Math.ceil(autonomiaNecesaria / HORAS_SOL_PICO / PANEL_SOLAR_CHICO);

    // 5. Cantidad de paneles recomendados = si (Panel Solar ≥ 5; 5; Panel Solar)
    const cantPaneles = panelSolar >= 5 ? 5 : panelSolar;

    // 6. Necesario en Baterías = Autonomía / DOD
    const necesarioBaterias = autonomiaNecesaria / DOD;

    // 7. Cantidad de baterías extra
    let cantBateriasExtra = 0;
    if (needsMobileChassis) {
      cantBateriasExtra = Math.ceil(necesarioBaterias / (BATERIA_EXTRA - BATERIA_BASE));
    } else {
      cantBateriasExtra = Math.ceil(necesarioBaterias / BATERIA_EXTRA);
    }

    // 8. Estación de energía recomendada
    let estacionRecomendada = "";
    if (necesarioBaterias <= 1037) {
      estacionRecomendada = "A1";
    } else if (necesarioBaterias <= 2074) {
      estacionRecomendada = "A2";
    } else if (necesarioBaterias <= 3197) {
      estacionRecomendada = "A3";
    } else if (necesarioBaterias <= 4234) {
      estacionRecomendada = "A4";
    } else if (necesarioBaterias <= 5357) {
      estacionRecomendada = "A5";
    } else if (necesarioBaterias <= 6394) {
      estacionRecomendada = "A6";
    } else if (necesarioBaterias <= 7517) {
      estacionRecomendada = "A7";
    } else {
      estacionRecomendada = "A7+";
    }

    setResult({
      potenciaNecesaria,
      potenciaPico,
      autonomiaNecesaria,
      panelSolar,
      cantPaneles,
      necesarioBaterias,
      estacionRecomendada,
      cantBateriasExtra,
    });
  };

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
      <LaserFlow color="#FFFFFF" horizontalBeamOffset={0.5} verticalBeamOffset={0.0} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Calculadora Solar B2Grow
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculá tu sistema de energía solar ideal
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/90 border-primary/20">
          <CardHeader>
            <CardTitle>Configuración del Sistema</CardTitle>
            <CardDescription>
              Seleccioná el tipo de proyecto y los artefactos que necesitás alimentar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tipo de Proyecto */}
            <div className="space-y-2">
              <Label htmlFor="projectType">Tipo de Proyecto</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="Seleccioná el tipo de proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {projectType === "Otros" && (
              <div className="space-y-2">
                <Label htmlFor="otherType">Especificá el uso</Label>
                <Input
                  id="otherType"
                  value={otherProjectType}
                  onChange={(e) => setOtherProjectType(e.target.value)}
                  placeholder="Describí el uso del sistema"
                  required
                />
              </div>
            )}

            {/* Chasis Móvil */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobileChassis"
                checked={needsMobileChassis}
                onCheckedChange={(checked) => setNeedsMobileChassis(checked as boolean)}
              />
              <Label htmlFor="mobileChassis" className="cursor-pointer">
                ¿Requiere chasis móvil para mover el equipo?
              </Label>
            </div>

            {/* Artefactos */}
            <Collapsible open={appliancesExpanded} onOpenChange={setAppliancesExpanded}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Artefactos de Consumo</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      {appliancesExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          Ocultar artefactos
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Mostrar todos los artefactos
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(APPLIANCES).map(([name, defaults]) => (
                      <div key={name} className="space-y-3 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={name}
                            checked={appliances[name].selected}
                            onCheckedChange={() => handleApplianceToggle(name)}
                          />
                          <Label htmlFor={name} className="cursor-pointer font-medium">
                            {name}
                          </Label>
                        </div>

                        {appliances[name].selected && (
                          <div className="grid grid-cols-2 gap-3 pl-6">
                            <div className="space-y-1">
                              <Label className="text-xs">Potencia (W)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="2200"
                                value={appliances[name].power}
                                onChange={(e) =>
                                  handleApplianceChange(name, "power", Number(e.target.value))
                                }
                                className="h-8"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Cantidad</Label>
                              <Input
                                type="number"
                                min="0"
                                max="200"
                                value={appliances[name].quantity}
                                onChange={(e) =>
                                  handleApplianceChange(name, "quantity", Number(e.target.value))
                                }
                                className="h-8"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Potencia Pico (W)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="6000"
                                value={appliances[name].peakPower}
                                onChange={(e) =>
                                  handleApplianceChange(name, "peakPower", Number(e.target.value))
                                }
                                className="h-8"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Uso (hs/día)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="24"
                                step="0.1"
                                value={appliances[name].usage}
                                onChange={(e) =>
                                  handleApplianceChange(name, "usage", Number(e.target.value))
                                }
                                className="h-8"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            <Button
              onClick={calculateResults}
              className="w-full"
              size="lg"
              disabled={!projectType || (projectType === "Otros" && !otherProjectType)}
            >
              <Zap className="mr-2" />
              Calcular Sistema
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="backdrop-blur-sm bg-card/90 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="text-foreground" />
                    Potencia Necesaria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">
                    {result.potenciaNecesaria.toFixed(0)} W
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/90 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="text-foreground" />
                    Potencia Pico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">
                    {result.potenciaPico.toFixed(0)} W
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/90 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="text-foreground" />
                    Autonomía Necesaria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">
                    {result.autonomiaNecesaria.toFixed(0)} Wh
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/90 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="text-foreground" />
                    Paneles Solares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">
                    {result.cantPaneles} unidades
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Panel Plegable de 200W
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/90 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="text-foreground" />
                    Baterías
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">
                    {result.necesarioBaterias.toFixed(0)} Wh
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {result.cantBateriasExtra} baterías extra
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/90 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="text-foreground" />
                    Estación Recomendada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">
                    {result.estacionRecomendada}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="backdrop-blur-sm bg-gradient-to-r from-primary/10 to-green-500/10 border-primary/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    La Estación de energía B2Grow Greenside recomendada es: {result.estacionRecomendada}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    No dudes en contactarnos ahora mismo para enviarte tu cotización o asesorarte
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      onClick={() => window.open("https://wa.me/5491151857753", "_blank")}
                      className="gap-2"
                      size="lg"
                    >
                      <MessageCircle />
                      Cotización: +54 9 11 5185-7753
                    </Button>
                    <Button
                      onClick={() => window.open("https://wa.me/5491166230246", "_blank")}
                      variant="secondary"
                      className="gap-2"
                      size="lg"
                    >
                      <MessageCircle />
                      Asesoramiento: +54 9 11 6623-0246
                    </Button>
                  </div>
                  <p className="text-sm font-semibold text-primary mt-4">
                    B2Grow – POWERING THE FUTURE
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Calculator;