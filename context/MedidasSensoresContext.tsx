// context/MedidasSensoresContext.tsx

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export interface IMedidaSensor {
  _id: string;
  sensor_id: string;
  cultivo_id: string;
  activo: boolean;
  fecha: Date;
  valor: number;
  ubicacion: string;
  notas?: string;
}

interface MedidaSensorContextType {
  ultimaMedida: IMedidaSensor | null;
  setUltimaMedida: (m: IMedidaSensor | null) => void;
  medidas: IMedidaSensor[];
  setMedidas: (m: IMedidaSensor[]) => void;
  fetchMedidaById: (medidaId: string) => Promise<IMedidaSensor>;
  fetchMedidasByCultivoAndSensor: (
    cultivoId: string,
    sensorId: string,
  ) => Promise<IMedidaSensor[]>;
}

const MedidasSensoresContext = createContext<
  MedidaSensorContextType | undefined
>(undefined);

export const MedidasSensoresProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [medidas, setMedidas] = useState<IMedidaSensor[]>([]);
  const [ultimaMedida, setUltimaMedida] = useState<IMedidaSensor | null>(null);

  const fetchMedidaById = async (medidaId: string) => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:5000/api/medidas/${medidaId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener medida:", error);
      return null;
    }
  };

  const fetchMedidasByCultivoAndSensor = async (
    cultivoId: string,
    sensorId: string,
  ) => {
    try {
      console.log(cultivoId, sensorId);
      const url = `http://192.168.1.4:5000/api/medidas/cultivo/${cultivoId}/sensor/${sensorId}`;
      const response = await axios.get(url);
      return response.data; // Devuelve las medidas
    } catch (error) {
      console.error("Error al obtener medidas por cultivo y sensor:", error);
      return [];
    }
  };

  return (
    <MedidasSensoresContext.Provider
      value={{
        ultimaMedida,
        setUltimaMedida,
        medidas,
        setMedidas,
        fetchMedidaById,
        fetchMedidasByCultivoAndSensor,
      }}
    >
      {children}
    </MedidasSensoresContext.Provider>
  );
};
export const useMedidas = () => {
  const context = useContext(MedidasSensoresContext);
  if (!context) {
    throw new Error("useMedidas debe usarse dentro de un MedidasProvider");
  }
  return context;
};

export default MedidasSensoresContext;
