// app/context/CultivosContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import type { IActuador } from "./ActuadoresContext";
import type { IMedidaSensor } from "./MedidasSensoresContext";
import type { ISensor } from "./SensoresContext";
import type { IReceta } from "./RecetasContext";
import type { IEtapa } from "./RecetasContext";
import axios from "axios";

export interface ISensorData {
  sensor_id: ISensor;
  ultimaMedida: IMedidaSensor;
}

export interface IActuadorData {
  actuador_id: IActuador;
  ultimaMedida: string;
}

export interface ICultivo {
  _id: string;
  actuadores: IActuadorData[];
  fecha: Date;
  nombre: string;
  receta_id: IReceta;
  sensores: ISensorData[];
  etapa_actual: IEtapa;
}

interface CultivosContextType {
  cultivos: ICultivo[];
  selectedCultivo: ICultivo | null;
  setSelectedCultivo: (c: ICultivo | null) => void;
  etapaActual: IEtapa | null;
  setEtapaActual: (e: IEtapa | null) => void;
  fetchCultivos: () => Promise<void>;
  fetchCultivoById: (cultivoId: string) => Promise<ICultivo>;
}

const CultivosContext = createContext<CultivosContextType | undefined>(
  undefined,
);

// Proveedor
export const CultivosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCultivo, setSelectedCultivo] = useState<ICultivo | null>(null);
  const [etapaActual, setEtapaActual] = useState<IEtapa | null>(null);
  const [cultivos, setCultivos] = useState<ICultivo[]>([]);

  // Función para obtener la lista de cultivos
  const fetchCultivos = async () => {
    try {
      const response = await axios.get("http://192.168.1.4:5000/api/cultivos");
      setCultivos(response.data);
    } catch (error) {
      console.error("Error al obtener cultivos:", error);
    }
  };

  const fetchCultivoById = async (cultivoId: string) => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:5000/api/cultivos/${cultivoId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener cultivo:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchCultivos();
  }, []);

  return (
    <CultivosContext.Provider
      value={{
        cultivos,
        selectedCultivo,
        setSelectedCultivo,
        etapaActual,
        setEtapaActual,
        fetchCultivos,
        fetchCultivoById,
      }}
    >
      {children}
    </CultivosContext.Provider>
  );
};

// Hook para usar el contexto
export const useCultivos = () => {
  const context = useContext(CultivosContext);
  if (!context) {
    throw new Error("useCultivos debe usarse dentro de un CultivosProvider");
  }
  return context;
};

export default CultivosContext;
