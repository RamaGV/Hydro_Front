// app/context/ActuadoresContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface IActuador {
  _id: string;
  nombre: string;
  unidad: string;
  tipo: string;
}

interface ActuadoresContextProps {
  actuadores: IActuador[];
  selectedActuador: IActuador | null;
  setSelectedActuador: (actuador: IActuador | null) => void;
  fetchActuadores: () => Promise<void>;
}

const ActuadoresContext = createContext<ActuadoresContextProps | undefined>(
  undefined,
);

export const ActuadoresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [actuadores, setActuadores] = useState<IActuador[]>([]);
  const [selectedActuador, setSelectedActuador] = useState<IActuador | null>(
    null,
  );

  const fetchActuadores = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.4:5000/api/actuadores",
      );
      setActuadores(response.data);
    } catch (error) {
      console.error("Error al obtener actuadores:", error);
    }
  };

  useEffect(() => {
    fetchActuadores();
  }, []);

  return (
    <ActuadoresContext.Provider
      value={{
        actuadores,
        selectedActuador,
        setSelectedActuador: setSelectedActuador,
        fetchActuadores,
      }}
    >
      {children}
    </ActuadoresContext.Provider>
  );
};

export const useActuadores = () => {
  const context = useContext(ActuadoresContext);
  if (context === undefined) {
    throw new Error("useActuadores must be used within a ActuadoresProvider");
  }
  return context;
};

export default ActuadoresContext;
