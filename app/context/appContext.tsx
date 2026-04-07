'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// define global vars + setters
interface AppContextType {
    appUsername: string | null;
    setAppUsername: (username: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (authenticated: boolean) => void;
}

// create container for global data
const AppContext = createContext<AppContextType | undefined>(undefined);

// create wrapper for entire app to expose global data to any children
interface AppProviderProps { children: ReactNode }

export function AppProvider({ children }: AppProviderProps) {
    const [appUsername, setAppUsername] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const value: AppContextType = { 
        appUsername, setAppUsername, isAuthenticated, setIsAuthenticated
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// provide context to children
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) throw new Error('Cannot find global App Context');
    return context;
}