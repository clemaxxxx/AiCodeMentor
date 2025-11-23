import  { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { UserData, UserLoginOutput } from '../types/api';

interface AuthContextType {
    user: UserData | null;
    token: string | null;
    role: string | null;
    login: (authData: UserLoginOutput) => void;
    logout: () => void;
    isAuthInitialized: boolean;
}

const defaultContextValue: AuthContextType = {
    user: null,
    token: null,
    role: null,
    login: () => {},
    logout: () => {},
    isAuthInitialized: false,
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);

    const logout = () => {
        setUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
    };


    const login = (authData: UserLoginOutput) => {
        localStorage.setItem('userToken', authData.token);
        localStorage.setItem('userId', authData.user.id.toString());
        localStorage.setItem('userRole', authData.role);
        localStorage.setItem('username', authData.user.name);
        setUser(authData.user);
        setToken(authData.token);
        setRole(authData.role);
    };


    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        const storedUserId = localStorage.getItem('userId');
        const storedUserName = localStorage.getItem('username');
        const storedUserRole = localStorage.getItem('userRole');

        if (storedToken && storedUserId && storedUserName && storedUserRole) {
            setToken(storedToken);
            setRole(storedUserRole);
            setUser({
                id: parseInt(storedUserId),
                name: storedUserName,
                exercises: null,
            } as UserData);
        }
        setIsAuthInitialized(true);
    }, []);


    return (
        <AuthContext.Provider value={{ user, token, role, login, logout, isAuthInitialized }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser l'état d'authentification
export const useAuth = () => useContext(AuthContext);