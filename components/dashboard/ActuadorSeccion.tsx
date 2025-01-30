// app/dashboard/components/ActuadorSeccion.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import ActuadorChip from "./ActuadorChip";

export default function ActuadorSeccion() {
  // const { selectedActuador, setActuadorSelected } = useActuadores();

  const [showChart, setShowChart] = useState(false);

  const controlTypes = ["flujo", "agua", "phPlus", "phMinus"];

  const handleToggleChart = () => {
    setShowChart((prev) => !prev);
  };

  return (
    <View className="mt-2">
      <View
        className="flex-row justify-around py-2
          bg-gray-900 border-b border-t border-gray-800"
      >
        {controlTypes.map((cType) => (
          <ActuadorChip key={cType} controlType={cType} />
        ))}
      </View>

      {/* Botón Control */}
      <TouchableOpacity
        className="flex-row justify-between px-4 py-3 bg-gray-900"
        activeOpacity={0.95}
        onPress={handleToggleChart}
      >
        <Text className="text-gray-300 text-base">Control</Text>
        <Ionicons
          name={showChart ? "chevron-down-outline" : "chevron-forward-outline"}
          size={20}
          color={"#999"}
        />
      </TouchableOpacity>
    </View>
  );
}
