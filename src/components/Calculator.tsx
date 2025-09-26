import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator as CalcIcon, Zap, Leaf, TrendingUp, Battery, Lightbulb, Sparkles } from "lucide-react";
import LaserFlow from "@/components/effects/LaserFlow";

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
    <section id="calculadora" className="min-h-screen py-20 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
              <div className="relative overflow-hidden rounded-lg min-h-[600px] bg-gradient-to-b from-background/20 to-background/5">
                <div className="absolute inset-0 z-10">
                  <LaserFlow 
                    color="#B19EEF" 
                    horizontalBeamOffset={0.5}
                    verticalBeamOffset={0.0}
                  />
                </div>
                <Card className="animate-scale-in relative z-20 bg-background/40 backdrop-blur-sm border-primary/30 shadow-lg shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <CalcIcon className="h-6 w-6 text-primary" />
                      Calculadora de Producto a Medida
                      <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                        IA Integrada
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <Label htmlFor="consumption" className="flex items-center gap-2">
                          Consumo (W)
                          <Zap className="h-4 w-4 text-primary/60" />
                        </Label>
                        <Input
                          id="consumption"
                          type="number"
                          placeholder="Ej: 500"
                          value={energyValues.consumption}
                          onChange={(e) => setEnergyValues(prev => ({ ...prev, consumption: e.target.value }))}
                          className="mt-2 transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="hours" className="flex items-center gap-2">
                          Horas de uso diario
                          <Battery className="h-4 w-4 text-accent/60" />
                        </Label>
                        <Input
                          id="hours"
                          type="number"
                          placeholder="Ej: 8"
                          value={energyValues.hours}
                          onChange={(e) => setEnergyValues(prev => ({ ...prev, hours: e.target.value }))}
                          className="mt-2 transition-all duration-300 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={calculateEnergyNeeds}
                      className="w-full bg-gradient-primary hover:shadow-energy transition-all duration-300 group"
                      size="lg"
                    >
                      <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                      Calcular Equipo Recomendado
                    </Button>

                    {energyResult && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        <Card className="bg-primary/10 border-primary/20 hover:bg-primary/15 transition-all duration-300 group">
                          <CardContent className="p-4 text-center">
                            <Zap className="h-8 w-8 text-primary mx-auto mb-2 group-hover:animate-pulse" />
                            <p className="text-sm text-muted-foreground">Energía Diaria</p>
                            <p className="text-2xl font-bold text-primary">{energyResult.totalEnergy} kWh</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-accent/10 border-accent/20 hover:bg-accent/15 transition-all duration-300 group">
                          <CardContent className="p-4 text-center">
                            <Battery className="h-8 w-8 text-accent mx-auto mb-2 group-hover:animate-bounce" />
                            <p className="text-sm text-muted-foreground">Capacidad Recomendada</p>
                            <p className="text-2xl font-bold text-accent">{energyResult.recommendedCapacity} kWh</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-accent/10 border-accent/20 hover:bg-accent/15 transition-all duration-300 group">
                          <CardContent className="p-4 text-center">
                            <Leaf className="h-8 w-8 text-accent mx-auto mb-2 group-hover:animate-pulse" />
                            <p className="text-sm text-muted-foreground">CO2 Ahorrado</p>
                            <p className="text-2xl font-bold text-accent">{energyResult.co2Saved} kg/mes</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-primary/10 border-primary/20 hover:bg-primary/15 transition-all duration-300 group">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2 group-hover:animate-bounce" />
                            <p className="text-sm text-muted-foreground">Ahorro Mensual</p>
                            <p className="text-2xl font-bold text-primary">${energyResult.monthlySaving}</p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="efficiency">
              <div className="relative overflow-hidden rounded-lg min-h-[600px] bg-gradient-to-b from-background/20 to-background/5">
                <div className="absolute inset-0 z-10">
                  <LaserFlow 
                    color="#22C55E" 
                    horizontalBeamOffset={0.3}
                    verticalBeamOffset={0.0}
                  />
                </div>
                <Card className="animate-scale-in relative z-20 bg-background/40 backdrop-blur-sm border-accent/30 shadow-lg shadow-accent/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Lightbulb className="h-6 w-6 text-accent" />
                      Calculadora de Eficiencia LED
                      <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                        <Leaf className="h-4 w-4 text-accent animate-pulse" />
                        Eco-Smart
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="lights" className="flex items-center gap-2">
                          Cantidad de Luces
                          <Lightbulb className="h-4 w-4 text-accent/60" />
                        </Label>
                        <Input
                          id="lights"
                          type="number"
                          placeholder="Ej: 20"
                          value={lightValues.lights}
                          onChange={(e) => setLightValues(prev => ({ ...prev, lights: e.target.value }))}
                          className="mt-2 transition-all duration-300 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="workHours" className="flex items-center gap-2">
                          Horas de Trabajo
                          <Battery className="h-4 w-4 text-primary/60" />
                        </Label>
                        <Input
                          id="workHours"
                          type="number"
                          placeholder="Ej: 8"
                          value={lightValues.workHours}
                          onChange={(e) => setLightValues(prev => ({ ...prev, workHours: e.target.value }))}
                          className="mt-2 transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="occupancy" className="flex items-center gap-2">
                          Ocupación Diaria (%)
                          <TrendingUp className="h-4 w-4 text-accent/60" />
                        </Label>
                        <Input
                          id="occupancy"
                          type="number"
                          placeholder="Ej: 70"
                          min="10"
                          max="90"
                          value={lightValues.occupancy}
                          onChange={(e) => setLightValues(prev => ({ ...prev, occupancy: e.target.value }))}
                          className="mt-2 transition-all duration-300 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={calculateLightEfficiency}
                      className="w-full bg-gradient-energy hover:shadow-green group transition-all duration-300"
                      size="lg"
                    >
                      <Leaf className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      Calcular Ahorro Energético
                    </Button>

                    {lightResult && (
                      <div className="space-y-6 mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-accent/10 border-accent/20 hover:bg-accent/15 transition-all duration-300 group">
                            <CardContent className="p-4 text-center">
                              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2 group-hover:animate-pulse" />
                              <p className="text-sm text-muted-foreground">Eficiencia</p>
                              <p className="text-3xl font-bold text-accent">{lightResult.efficiency}%</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-primary/10 border-primary/20 hover:bg-primary/15 transition-all duration-300 group">
                            <CardContent className="p-4 text-center">
                              <Zap className="h-8 w-8 text-primary mx-auto mb-2 group-hover:animate-bounce" />
                              <p className="text-sm text-muted-foreground">Ahorro Anual</p>
                              <p className="text-2xl font-bold text-primary">{lightResult.yearlySaving} kWh</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-accent/10 border-accent/20 hover:bg-accent/15 transition-all duration-300 group">
                            <CardContent className="p-4 text-center">
                              <Leaf className="h-8 w-8 text-accent mx-auto mb-2 group-hover:animate-pulse" />
                              <p className="text-sm text-muted-foreground">CO2 Reducido</p>
                              <p className="text-2xl font-bold text-accent">{lightResult.co2Reduction} kg/año</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <Card className="bg-gradient-energy/10 border-accent/30 hover:border-accent/50 transition-all duration-300">
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Calculator;