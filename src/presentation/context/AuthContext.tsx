import React from 'react';

interface AuthContextProps {
  user: {name: string; lastName: string} | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = React.useState<{name: string; lastName: string} | null>(null);

  const login = async (email: string, password: string) => {
    // Lógica mockeada
    console.log(email,password,"hereeee");
    
    if (email === 'IronMan@gmail.com' && password === '123456') {
      const mockUser = {name: 'Tony', lastName: 'Stark'};
      setUser(mockUser);
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};