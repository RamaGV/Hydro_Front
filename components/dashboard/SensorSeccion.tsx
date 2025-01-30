// app/dashboard/components/SensorSeccion.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useCultivos } from "@/context/CultivosContext";
import { useSensores } from "@/context/SensoresContext";
import { useMedidas } from "@/context/MedidasSensoresContext";

import type { ISensor } from "@/context/SensoresContext";

import ChartSensorCard from "./ChartSensorCard";
import SensorLabel from "./SensorLabel";
import SensorChip from "./SensorChip";

export default function SensorSeccion() {
  const {
    ultimaMedida,
    setUltimaMedida,
    setMedidas,
    fetchMedidasByCultivoAndSensor,
  } = useMedidas();
  const { sensorSelected, setSensorSelected } = useSensores();
  const { etapaActual, selectedCultivo } = useCultivos();

  const [showChart, setShowChart] = useState(false);

  const fetchMedidas = async (sensor: ISensor) => {
    if (!selectedCultivo || !sensor) return;

    try {
      const fetchedMedidas = await fetchMedidasByCultivoAndSensor(
        selectedCultivo._id,
        sensor._id,
      );
      setMedidas(fetchedMedidas);
      setUltimaMedida(fetchedMedidas[fetchedMedidas.length - 1]);
    } catch (error) {
      console.error("Error al obtener medidas:", error);
    }
  };

  const handleSensorPress = (sensor: ISensor) => {
    if (!sensorSelected || sensorSelected !== sensor) {
      setSensorSelected(sensor);
      fetchMedidas(sensor);
      setShowChart(true);
    } else {
      setShowChart(!showChart);
    }
  };

  const handleToggleChart = () => {
    setShowChart((prev) => !prev);
  };

  return (
    <View className="mb-4">
      {/* Chips de sensores */}
      <View
        className="flex-row justify-around items-center py-2 
      bg-gray-900 border-b border-t border-gray-800"
      >
        {selectedCultivo?.sensores.map((sensor, index) => (
          <SensorChip
            key={index}
            sensor={sensor.sensor_id}
            onPress={() => handleSensorPress(sensor.sensor_id)}
            medida={sensor.ultimaMedida.valor}
            isSelected={showChart && sensorSelected === sensor.sensor_id}
          />
        ))}
      </View>

      {/* Botón para mostrar o ocultar el chart */}
      <TouchableOpacity
        className="flex-row justify-between px-5 py-3 shadow-xl
        bg-gray-900"
        onPress={handleToggleChart}
        activeOpacity={0.95}
      >
        <Text className="text-gray-300 text-base">Medidas</Text>
        <Ionicons
          name={showChart ? "chevron-down-outline" : "chevron-forward-outline"}
          size={20}
          color={"#999"}
        />
      </TouchableOpacity>

      {/* Label de chart */}
      {showChart && sensorSelected && etapaActual && ultimaMedida ? (
        <View className="flex-row h-52 bg-gray-900 p-6 rounded-b-xl shadow-lg">
          <SensorLabel
            sensorSelected={sensorSelected}
            unaMedida={ultimaMedida}
            etapaActual={etapaActual}
          />
          <ChartSensorCard />
        </View>
      ) : null}
    </View>
  );
}
