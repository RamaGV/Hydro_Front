// app/cultivos/components/CultivoCard.tsx

import React from "react";
import type { ICultivo } from "@/context/CultivosContext";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CultivoCardProps {
  cultivo: ICultivo;
  onPress: () => void;
}

export default function CultivoCard({ cultivo, onPress }: CultivoCardProps) {
  return (
    <TouchableOpacity
      className="bg-gray-900 p-4 rounded-lg mb-4 shadow-md flex-row items-center"
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Icono del cultivo */}
      <View className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
        <Ionicons name="leaf-outline" size={24} color="#fff" />
      </View>

      {/* Detalles del cultivo */}
      <View className="flex-1">
        <Text className="text-xl font-bold text-gray-200">
          {cultivo.nombre}
        </Text>
        {cultivo.receta_id && (
          <Text className="text-sm text-gray-400 mt-1">
            Receta: {cultivo.receta_id.nombre}
          </Text>
        )}
        <Text className="text-xs text-gray-500 mt-1">
          Creado el: {new Date(cultivo.fecha).toLocaleDateString("es-ES")}
        </Text>
      </View>

      {/* Indicador de sensores */}
      {cultivo.sensores && (
        <View className="flex-row items-center">
          <Ionicons name="analytics-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-1">
            {cultivo.sensores.length} sensores
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
