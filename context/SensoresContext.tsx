// app/context/SensoresContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface ISensor {
  _id: string;
  nombre: string;
  unidad: string;
  tipo: string;
  color: string;
}

interface SensoresContextProps {
  sensores: ISensor[];
  sensorSelected: ISensor | null;
  setSensorSelected: (sensor: ISensor | null) => void;
  fetchSensores: () => Promise<void>;
}

const SensoresContext = createContext<SensoresContextProps | undefined>(
  undefined,
);

export const SensoresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sensores, setSensores] = useState<ISensor[]>([]);
  const [sensorSelected, setSensorSelected] = useState<ISensor | null>(null);

  const fetchSensores = async () => {
    try {
      const response = await axios.get("http://192.168.1.4:5000/api/sensores");
      setSensores(response.data);
    } catch (error) {
      console.error("Error al obtener sensores:", error);
    }
  };

  useEffect(() => {
    fetchSensores();
  }, []);

  return (
    <SensoresContext.Provider
      value={{
        sensores: sensores,
        sensorSelected: sensorSelected,
        setSensorSelected: setSensorSelected,
        fetchSensores: fetchSensores,
      }}
    >
      {children}
    </SensoresContext.Provider>
  );
};

export const useSensores = () => {
  const context = useContext(SensoresContext);
  if (context === undefined) {
    throw new Error("useSensores must be used within a SensoresProvider");
  }
  return context;
};

export default SensoresContext;
