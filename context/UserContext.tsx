// app/context/UserContext.tsx

import React, { createContext, useContext, useState } from "react";

// Define la interfaz para el usuario
interface User {
  id: string;
  name: string;
  email: string;
}

// Define el tipo del contexto
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Crea el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};

export default UserContext;
