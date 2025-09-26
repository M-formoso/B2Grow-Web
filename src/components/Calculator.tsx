import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator as CalcIcon, Zap, Leaf, TrendingUp, Battery, Lightbulb } from "lucide-react";
import calculatorHero from "@/assets/calculator-hero.png";

const Calculator = () => {
  const [energyValues, setEnergyValues] = useState({
    consumption: "",
    hours: ""
  });

  const [lightValues, setLightValues] = useState({
    lights: "",
    workHours: "",
    occupancy: ""
  });

  const [energyResult, setEnergyResult] = useState<any>(null);
  const [lightResult, setLightResult] = useState<any>(null);

  const calculateEnergyNeeds = () => {
    const consumption = parseFloat(energyValues.consumption);
    const hours = parseFloat(energyValues.hours);
    
    if (consumption && hours) {
      const totalEnergy = consumption * hours;
      const recommendedCapacity = totalEnergy * 1.3; // 30% buffer
      const co2Saved = totalEnergy * 0.45; // kg CO2 per kWh saved
      
      setEnergyResult({
        totalEnergy: totalEnergy.toFixed(2),
        recommendedCapacity: recommendedCapacity.toFixed(2),
        co2Saved: co2Saved.toFixed(2),
        monthlySaving: (totalEnergy * 30 * 0.12).toFixed(2) // $0.12 per kWh average
      });
    }
  };

  const calculateLightEfficiency = () => {
    const lights = parseInt(lightValues.lights);
    const workHours = parseFloat(lightValues.workHours);
    const occupancy = parseFloat(lightValues.occupancy) / 100;
    
    if (lights && workHours && occupancy) {
      const standardPower = 150; // watts per light
      const ledPower = 45; // LED equivalent
      
      const dailyStandard = (lights * standardPower * workHours) / 1000;
      const dailyLED = (lights * ledPower * workHours * occupancy) / 1000;
      const dailySaving = dailyStandard - dailyLED;
      
      const monthlySaving = dailySaving * 30;
      const yearlySaving = dailySaving * 365;
      const co2Reduction = yearlySaving * 0.45;
      const costSaving = yearlySaving * 0.12;
      
      setLightResult({
        dailySaving: dailySaving.toFixed(2),
        monthlySaving: monthlySaving.toFixed(2),
        yearlySaving: yearlySaving.toFixed(2),
        co2Reduction: co2Reduction.toFixed(2),
        costSaving: costSaving.toFixed(2),
        efficiency: ((dailySaving / dailyStandard) * 100).toFixed(1)
      });
    }
  };

  return (
    <section id="calculadora" className="py-20 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Calculadoras </span>
            <span className="bg-gradient-energy bg-clip-text text-transparent">Inteligentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Descubre el equipo perfecto para tus necesidades y calcula tu potencial de ahorro energético.
          </p>
          
          {/* Hero Calculator Image */}
          <div className="relative max-w-md mx-auto mb-8 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="absolute inset-0 bg-gradient-energy rounded-2xl blur-2xl opacity-20 animate-glow"></div>
            <img 
              src={calculatorHero} 
              alt="Calculadora Energética Inteligente" 
              className="relative z-10 w-full rounded-2xl shadow-lift"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="energy" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="energy" className="flex items-center gap-2">
                <Battery className="h-4 w-4" />
                Producto a Medida
              </TabsTrigger>
              <TabsTrigger value="efficiency" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Eficiencia LED
              </TabsTrigger>
            </TabsList>

            <TabsContent value="energy">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <CalcIcon className="h-6 w-6 text-primary" />
                    Calculadora de Producto a Medida
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="consumption">Consumo (W)</Label>
                      <Input
                        id="consumption"
                        type="number"
                        placeholder="Ej: 500"
                        value={energyValues.consumption}
                        onChange={(e) => setEnergyValues(prev => ({ ...prev, consumption: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Horas de uso diario</Label>
                      <Input
                        id="hours"
                        type="number"
                        placeholder="Ej: 8"
                        value={energyValues.hours}
                        onChange={(e) => setEnergyValues(prev => ({ ...prev, hours: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateEnergyNeeds}
                    className="w-full bg-gradient-primary hover:shadow-energy"
                    size="lg"
                  >
                    Calcular Equipo Recomendado
                  </Button>

                  {energyResult && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                      <Card className="bg-primary/10 border-primary/20">
                        <CardContent className="p-4 text-center">
                          <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Energía Diaria</p>
                          <p className="text-2xl font-bold text-primary">{energyResult.totalEnergy} kWh</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-accent/10 border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Battery className="h-8 w-8 text-accent mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Capacidad Recomendada</p>
                          <p className="text-2xl font-bold text-accent">{energyResult.recommendedCapacity} kWh</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-accent/10 border-accent/20">
                        <CardContent className="p-4 text-center">
                          <Leaf className="h-8 w-8 text-accent mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">CO2 Ahorrado</p>
                          <p className="text-2xl font-bold text-accent">{energyResult.co2Saved} kg/mes</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/10 border-primary/20">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Ahorro Mensual</p>
                          <p className="text-2xl font-bold text-primary">${energyResult.monthlySaving}</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="efficiency">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Lightbulb className="h-6 w-6 text-accent" />
                    Calculadora de Eficiencia LED
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="lights">Cantidad de Luces</Label>
                      <Input
                        id="lights"
                        type="number"
                        placeholder="Ej: 20"
                        value={lightValues.lights}
                        onChange={(e) => setLightValues(prev => ({ ...prev, lights: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="workHours">Horas de Trabajo</Label>
                      <Input
                        id="workHours"
                        type="number"
                        placeholder="Ej: 8"
                        value={lightValues.workHours}
                        onChange={(e) => setLightValues(prev => ({ ...prev, workHours: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="occupancy">Ocupación Diaria (%)</Label>
                      <Input
                        id="occupancy"
                        type="number"
                        placeholder="Ej: 70"
                        min="10"
                        max="90"
                        value={lightValues.occupancy}
                        onChange={(e) => setLightValues(prev => ({ ...prev, occupancy: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateLightEfficiency}
                    className="w-full bg-gradient-energy hover:shadow-green"
                    size="lg"
                  >
                    Calcular Ahorro Energético
                  </Button>

                  {lightResult && (
                    <div className="space-y-6 mt-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-accent/10 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Eficiencia</p>
                            <p className="text-3xl font-bold text-accent">{lightResult.efficiency}%</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-primary/10 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Ahorro Anual</p>
                            <p className="text-2xl font-bold text-primary">{lightResult.yearlySaving} kWh</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-accent/10 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <Leaf className="h-8 w-8 text-accent mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">CO2 Reducido</p>
                            <p className="text-2xl font-bold text-accent">{lightResult.co2Reduction} kg/año</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card className="bg-gradient-energy/10 border-accent/30">
                        <CardContent className="p-6 text-center">
                          <h3 className="text-xl font-bold text-foreground mb-2">Ahorro Económico Anual</h3>
                          <p className="text-4xl font-bold text-accent">${lightResult.costSaving}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Con iluminación LED inteligente vs. iluminación tradicional
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Calculator;