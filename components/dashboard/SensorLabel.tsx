// app/dashboard/components/SensorLabel.tsx

import React from "react";
import { View, Text } from "react-native";
import { IMedidaSensor } from "@/context/MedidasSensoresContext";
import { ISensor } from "@/context/SensoresContext";
import { IEtapa } from "@/context/RecetasContext";

interface SensorLabelProps {
  sensorSelected: ISensor;
  unaMedida: IMedidaSensor;
  etapaActual: IEtapa;
}

export default function SensorLabel({
  unaMedida,
  sensorSelected,
  etapaActual,
}: SensorLabelProps) {
  const sensor = { pH: 0, EC: 1, Temp: 2, Hum: 3 }[sensorSelected.tipo];
  // const { min, max } = etapaActual.condiciones_ideales[sensor];

  return (
    <View className="h-full w-1/3 bg-red-600 rounded-lg">
      {/* <Text className="text-lg font-bold text-gray-300">{unaMedida.min}</Text> */}
      {/* <Text className="text-lg font-bold text-gray-300">{max}</Text> */}
    </View>
  );
}
