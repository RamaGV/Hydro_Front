// app/dashboard/components/EtapasCard.tsx

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { useCultivos } from "@/context/CultivosContext";
import { useRecetas } from "@/context/RecetasContext";

// Importa los pares de SVG
import Fase1 from "@/assets/fases/fase_1_4.svg";
import Fase1Active from "@/assets/fases/fase_1_4_active.svg";
import Fase2 from "@/assets/fases/fase_2_4.svg";
import Fase2Active from "@/assets/fases/fase_2_4_active.svg";
import Fase3 from "@/assets/fases/fase_3_4.svg";
import Fase3Active from "@/assets/fases/fase_3_4_active.svg";
import Fase4 from "@/assets/fases/fase_4_4.svg";
import Fase4Active from "@/assets/fases/fase_4_4_active.svg";

// Array de pares [normal, active]
const ETAPAS_SVG = [
  { normal: Fase4, active: Fase4Active },
  { normal: Fase3, active: Fase3Active },
  { normal: Fase2, active: Fase2Active },
  { normal: Fase1, active: Fase1Active },
];

export default function EtapasCard() {
  const { etapaActual, setEtapaActual, selectedCultivo } = useCultivos();
  const [diasTranscurridos, setDiasTranscurridos] = useState(0);
  const { selectedReceta } = useRecetas();

  // 1. Calcular días transcurridos
  const calcularDiasTranscurridos = () => {
    if (!selectedCultivo) return;

    const hoy = new Date();
    const fechaInicio = new Date(selectedCultivo.fecha);
    const diffMs = hoy.getTime() - fechaInicio.getTime();
    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    setDiasTranscurridos(dias);
  };

  // 2. Determinar la etapa actual (según los días transcurridos)
  const calcularEtapaActual = () => {
    if (!selectedReceta) return;
    let diasRestantes = diasTranscurridos;

    for (const etapa of selectedReceta.etapas) {
      diasRestantes -= etapa.duracion_dias;
      if (diasRestantes <= 0) {
        setEtapaActual(etapa);
        break; // salimos del loop
      }
    }
  };

  useEffect(() => {
    if (selectedCultivo) {
      calcularDiasTranscurridos();
    }
  }, [selectedCultivo]);

  useEffect(() => {
    if (selectedReceta) {
      calcularEtapaActual();
    }
  }, [diasTranscurridos, selectedReceta]);

  return (
    <View
      className="w-36 h-36 rounded-lg my-2
        bg-gray-900 shadow-xl shadow-gray-800"
    >
      {/* Título */}
      <Text className="w-full text-center mb-1 py-1 text-gray-500 font-bold border-b-2 border-gray-700">
        Etapas
      </Text>

      {/* Contenedor de etapas */}
      <View className="flex-1 justify-between mx-2 my-2">
        {selectedReceta.etapas
          .slice()
          .reverse()
          .map((etapa, index) => {
            // 3. Decidir si es la etapa actual
            const isHighlighted = etapaActual?.nombre === etapa.nombre;

            // 4. Obtener los SVGs del array ETAPAS_SVG (index “limitado”)
            const { normal: NormalIcon, active: ActiveIcon } =
              ETAPAS_SVG[index] || ETAPAS_SVG[0];

            // Asigno el ícono: normal o activo
            const SvgIcon = isHighlighted ? ActiveIcon : NormalIcon;

            return (
              <View
                key={index}
                className="flex-row items-center justify-between"
              >
                <SvgIcon width={30} height={24} />
                <Text
                  className={
                    isHighlighted
                      ? "absolute left-12 font-bold text-yellow-500"
                      : "absolute left-12 text-gray-500"
                  }
                >
                  {etapa.nombre}
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
}
