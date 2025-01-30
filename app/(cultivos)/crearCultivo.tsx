// app/cultivos/crearCultivo.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useRecetas } from "@/context/RecetasContext";
import { useCultivos } from "@/context/CultivosContext";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CrearCultivo() {
  const [cultivoName, setCultivoName] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const { recetas: recipes } = useRecetas();
  const { fetchCultivos } = useCultivos();
  const router = useRouter();

  const handleCreateCultivo = async () => {
    if (!cultivoName || !selectedRecipe) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.4:5000/api/cultivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cultivoName,
          recipe_id: selectedRecipe,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Cultivo creado exitosamente.");
        fetchCultivos(); // Refresca la lista de cultivos
        router.push("/(cultivos)");
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Error",
          errorData.message || "No se pudo crear el cultivo.",
        );
      }
    } catch (error) {
      console.error("Error al crear el cultivo:", error);
      Alert.alert("Error", "Hubo un problema al crear el cultivo.");
    }
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Botón de volver */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.push("/(cultivos)")}>
          <Ionicons name="arrow-back-outline" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-center text-2xl font-bold text-gray-200 pl-12">
          Crear Nuevo Cultivo
        </Text>
      </View>
      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 80 }}
      >
        {/* Título */}

        {/* Nombre del cultivo */}
        <View className="mb-4">
          <Text className="text-gray-400 mb-2">Nombre del Cultivo</Text>
          <TextInput
            placeholder="Ingresa el nombre del cultivo"
            value={cultivoName}
            onChangeText={setCultivoName}
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
          />
        </View>

        {/* Selección de receta */}
        <View className="mb-4">
          <Text className="text-gray-400 mb-2">Selecciona una Receta</Text>
          {recipes.map((recipe) => (
            <TouchableOpacity
              key={recipe._id}
              className={`p-4 rounded-lg mb-2 border ${
                selectedRecipe === recipe._id
                  ? "border-green-500"
                  : "border-gray-700"
              } bg-gray-800`}
              onPress={() => setSelectedRecipe(recipe._id)}
            >
              <Text className="text-gray-200 font-bold">{recipe.nombre}</Text>
              {recipe.descripcion && (
                <Text className="text-gray-400 text-sm">
                  {recipe.descripcion}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botón para crear cultivo */}
      <View className="absolute bottom-0 left-0 right-0 bg-gray-900 p-6">
        <Button
          text="Crear Cultivo"
          style="bg-green-600"
          onPress={handleCreateCultivo}
        />
      </View>
    </View>
  );
}
