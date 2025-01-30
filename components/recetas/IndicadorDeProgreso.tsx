// app/recetas/components/IndicadorDeProceso.tsx

import React from "react";
import { View } from "react-native";

interface IndicadorDeProcesoProps {
  etapaActual: number;
  etapasTotales: number;
}

export default function IndicadorDeProceso({
  etapaActual: etapaActual,
  etapasTotales: etapasTotales,
}: IndicadorDeProcesoProps) {
  return (
    <View className="flex-row items-center justify-center mb-4">
      {Array.from({ length: etapasTotales }).map((_, index) => (
        <View
          key={index}
          className={`flex-1 h-2 rounded-full ${
            index < etapaActual ? "bg-green-600" : "bg-gray-500"
          } ${index > 0 ? "ml-2" : ""}`}
        />
      ))}
    </View>
  );
}
