// app/(recetas)/pasos/PasoTres.tsx

import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { ImageBackground } from "expo-image";
import HeaderBack from "@/components/HeaderBack";
import Button from "@/components/Button";
import CardPasoTres from "@/components/recetas/CardPasoTres";
import IndicadorDeProgreso from "@/components/recetas/IndicadorDeProgreso";

interface Etapa {
  nombre: string;
  duracion_dias: number;
  complete: boolean;
  ideal_conditions: {
    type: string;
    min: number;
    max: number;
    minBase: number;
    maxBase: number;
    selected: boolean;
  }[];
}

interface StepThreeProps {
  etapas: Etapa[];
  setEtapas: React.Dispatch<React.SetStateAction<any[]>>;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepThree({
  etapas,
  setEtapas,
  onBack,
  onSubmit,
}: StepThreeProps) {
  // Filtrar las etapas confirmadas
  const etapasConfirmadas = etapas.filter((etapa) => etapa.complete);

  const handleSaveStage = (index: number) => {
    const etapa = etapasConfirmadas[index];

    setEtapas((prev) => {
      const updated = [...prev];
      const originalIndex = etapas.findIndex((e) => e.nombre === etapa.nombre);
      updated[originalIndex].complete = true;

      return updated;
    });
  };

  const handleSubmit = () => {
    if (etapasConfirmadas.some((etapa) => !etapa.complete)) {
      Alert.alert(
        "Error",
        "Todas las etapas deben estar completas antes de continuar.",
      );
      return;
    }
    onSubmit();
  };

  return (
    <ImageBackground
      source={require("../../../assets/fondo.png")}
      className="flex-1 p-4"
      contentFit="cover"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {/* Header y progreso */}
      <HeaderBack text="Condiciones por Etapa" onBack={onBack} />
      <IndicadorDeProgreso etapaActual={3} etapasTotales={3} />

      {/* Lista de Etapas */}
      <ScrollView className="flex-1 p-4 mb-12">
        <View className="mb-6">
          {etapasConfirmadas.map((etapa, index) => (
            <CardPasoTres
              key={index}
              etapa={etapa}
              index={index}
              isVisible={true}
              onConfirm={handleSaveStage}
            />
          ))}
        </View>
      </ScrollView>

      {/* Botón de envío */}
      <View className="absolute bottom-0 left-0 right-0 p-6">
        <Button text="Finalizar" color="green" onPress={handleSubmit} />
      </View>
    </ImageBackground>
  );
}
