// app/dashboard/components/TopBar.tsx
import React from "react";
import { View, Text } from "react-native";

export default function TopBar() {
  return (
    <View className="flex-row items-center justify-center py-3 bg-gray-900 border-b border-gray-800">
      {/* Indicador de estado (p. ej. rojo = offline) */}
      <View className="w-4 h-4 bg-green-600 rounded-full mr-2" />
      <Text className="text-white font-bold text-2xl mr-2">HydroEdge</Text>
    </View>
  );
}
