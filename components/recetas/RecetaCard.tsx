// app/(recetas)/components/RecetaCard.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import type { IReceta } from "@/context/RecetasContext";

import { Ionicons } from "@expo/vector-icons";

interface RecetaCardProps {
  receta: IReceta;
  onPress: () => void;
}

export default function RecetaCard({ receta, onPress }: RecetaCardProps) {
  return (
    <TouchableOpacity
      className="bg-gray-900 p-4 rounded-lg mb-4 shadow-md flex-row items-center"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
        <Ionicons name="library" size={24} color="#fff" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-200">{receta.nombre}</Text>
        <Text className="text-sm text-gray-400 mt-1">{receta.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );
}
