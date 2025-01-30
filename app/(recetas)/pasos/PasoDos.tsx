// app/(recetas)/pasos/PasoDos.tsx

import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { ImageBackground } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";

import IndicadorDeProgreso from "@/components/recetas/IndicadorDeProgreso";
import CardPasoDos from "@/components/recetas/CardPasoDos";
import HeaderBack from "@/components/HeaderBack";
import Button from "@/components/Button";

interface Etapa {
  duracion_dias: number;
  nombre: string;
  complete: boolean;
}

interface PasoDosProps {
  etapas: Etapa[];
  setEtapas: React.Dispatch<React.SetStateAction<any[]>>;
  onNext: () => void;
  onBack: () => void;
}

export default function PasoDos({
  etapas,
  setEtapas,
  onNext,
  onBack,
}: PasoDosProps) {
  const [visibleIndex, setVisibleIndex] = useState(0);

  // Asegurarse de que las etapas confirmadas sean visibles al regresar
  useEffect(() => {
    const lastConfirmedIndex = etapas.findIndex((etapa) => !etapa.complete);
    setVisibleIndex(
      lastConfirmedIndex !== -1 ? lastConfirmedIndex : etapas.length,
    );
  }, [etapas]);

  const handleConfirmEtapa = (index: number, etapa: Etapa) => {
    setEtapas((prev) => {
      const updated = [...prev];
      updated[index].duracion_dias = etapa.duracion_dias;
      updated[index].nombre = etapa.nombre;
      updated[index].complete = etapa.complete;

      return updated;
    });

    // Avanzar al siguiente índice solo si la etapa actual es la última visible
    if (index === visibleIndex && index < etapas.length - 1) {
      setVisibleIndex(index + 1);
    }
  };

  const handleNext = () => {
    // Validar que al menos una etapa esté confirmada antes de avanzar
    if (!etapas.some((etapa) => etapa.complete)) {
      Alert.alert(
        "Error",
        "Debes confirmar al menos una etapa antes de continuar.",
      );
      return;
    }
    onNext();
  };

  return (
    <ImageBackground
      source={require("../../../assets/fondo.png")}
      className="flex-1 p-4"
      contentFit="cover"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <HeaderBack text="Duración por Etapa" onBack={onBack} />
      <IndicadorDeProgreso etapaActual={2} etapasTotales={3} />

      <ScrollView className="flex-1 p-4 mb-12">
        <View className="mb-6">
          {etapas.map((etapa, index) => (
            <CardPasoDos
              key={index}
              index={index}
              etapa={etapa}
              isVisible={index <= visibleIndex || etapas[index].complete}
              onConfirm={() => handleConfirmEtapa(index, etapa)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-6">
        <Button text="Siguiente" onPress={handleNext} color="green" />
      </View>
    </ImageBackground>
  );
}
