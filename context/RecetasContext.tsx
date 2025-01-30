// contexts/RecetasContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface IEtapa {
  nombre: string;
  duracion_dias: number;
  condiciones_ideales: {
    0: { tipo: string; min: number; max: number };
    1: { tipo: string; min: number; max: number };
    2: { tipo: string; min: number; max: number };
    3: { tipo: string; min: number; max: number };
  };
  parametros_de_actuadores: {
    0: { tipo: string; ciclosPorHora: number };
    1: { tipo: string; min: number; max: number };
    2: { tipo: string; min: number; max: number };
    3: { tipo: string; min: number; max: number };
  };
}

export interface IReceta {
  _id: string;
  nombre: string;
  descripcion: string;
  image?: string;
  etapas: IEtapa[];
}

// Interfaz del contexto
interface RecetasContextType {
  recetas: IReceta[];
  selectedReceta: IReceta;
  setSelectedReceta: (receta: IReceta) => void;
  fetchReceta: () => Promise<void>;
}

const RecetasContext = createContext<RecetasContextType | undefined>(undefined);

export const RecetasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recetas, setRecetas] = useState<IReceta[]>([]);
  const [selectedReceta, setSelectedReceta] = useState<IReceta | null>(null);

  const fetchRecetas = async () => {
    try {
      const response = await axios.get("http://192.168.1.4:5000/api/recetas");
      setRecetas(response.data);
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
    }
  };

  useEffect(() => {
    fetchRecetas();
  }, []);

  return (
    <RecetasContext.Provider
      value={{
        recetas: recetas,
        selectedReceta: selectedReceta,
        setSelectedReceta: setSelectedReceta,
        fetchReceta: fetchRecetas,
      }}
    >
      {children}
    </RecetasContext.Provider>
  );
};

export const useRecetas = () => {
  const context = useContext(RecetasContext);
  if (!context) {
    throw new Error("useRecetas debe usarse dentro de un RecetasProvider");
  }
  return context;
};

export default RecetasContext;
