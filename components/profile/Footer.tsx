// app/components/Footer.tsx

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

export default function Footer() {
  return (
    <View className="bg-gray-900 flex-row justify-around items-center py-4 absolute bottom-0 w-full">
      {/* Botón Home */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/dashboard")}
      >
        <Ionicons name="home-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Home</Text>
      </TouchableOpacity>

      {/* Botón Cultivos (Semilla) */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/cultivos")}
      >
        <MaterialCommunityIcons name="seed-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Cultivos</Text>
      </TouchableOpacity>

      {/* Botón Recetas */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/recetas")}
      >
        <Ionicons name="book-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Recetas</Text>
      </TouchableOpacity>

      {/* Botón Perfil */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/login")}
      >
        <Ionicons name="person-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Perfil</Text>
      </TouchableOpacity>

      {/* Botón Configuración */}
      <TouchableOpacity
        className="items-center"
        onPress={() => console.log("Configuración")}
      >
        <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Configuración</Text>
      </TouchableOpacity>
    </View>
  );
}
