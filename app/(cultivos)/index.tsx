// app/cultivos/index.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ImageBackground } from "expo-image";

import { useCultivos } from "@/context/CultivosContext";
import { useRecetas } from "@/context/RecetasContext";

import type { ICultivo } from "@/context/CultivosContext";

import CultivoCard from "../../components/cultivos/CultivoCard";
import Button from "@/components/Button";
import Footer from "@/components/Footer";

// Componente reutilizable para una tarjeta de cultivo

export default function CultivosScreen() {
  const { cultivos, setSelectedCultivo } = useCultivos();
  const { setSelectedReceta } = useRecetas();
  const router = useRouter();

  const handleSelectCultivo = (cultivo: ICultivo) => {
    setSelectedReceta(cultivo.receta_id);
    setSelectedCultivo(cultivo);
    router.push("/(dashboard)");
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      className="flex-1"
      contentFit="cover"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <View className="p-4 bg-gray-900 border-b-2 border-gray-800 shadow-lg">
        <Text className="text-center text-2xl font-bold text-gray-200">
          Selecciona un Cultivo
        </Text>
      </View>

      {/* Lista de cultivos */}
      <FlatList
        className="p-4 shadow-xl shadow-gray-800"
        data={cultivos}
        keyExtractor={(cultivo) => cultivo._id}
        renderItem={({ item: cultivo }) => (
          <CultivoCard
            cultivo={cultivo}
            onPress={() => handleSelectCultivo(cultivo)}
          />
        )}
        ListFooterComponent={
          <Button
            text="+ Crear Nuevo Cultivo"
            onPress={() => router.push("/(cultivos)/crearCultivo")}
            color="green"
            style="primary"
          />
        }
      />
      <Footer />
    </ImageBackground>
  );
}
