// app/dashboard/components/SensorChip.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { ISensor } from "@/context/SensoresContext";

interface SensorChipProps {
  sensor: ISensor;
  onPress: () => void;
  medida: number;
  isSelected: boolean;
}

const borderColors: Record<string, string> = {
  green: "border-green-500",
  yellow: "border-yellow-500",
  red: "border-red-500",
  blue: "border-blue-500",
};

const bgColors: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

export default function SensorChip({
  sensor,
  onPress,
  medida,
  isSelected,
}: SensorChipProps) {
  return (
    <View className="items-center">
      <TouchableOpacity onPress={onPress} className="items-center">
        <View
          className={`w-12 h-12 rounded-full border-2
          flex items-center justify-center mb-1 ${borderColors[sensor.color]} ${isSelected ? bgColors[sensor.color] : "bg-transparent"}`}
        >
          <Text className="text-center text-ms text-white">{sensor.tipo}</Text>
        </View>
      </TouchableOpacity>
      <Text className="text-center text-sm text-gray-300 ml-1">
        {medida} {sensor.unidad}
      </Text>
    </View>
  );
}
