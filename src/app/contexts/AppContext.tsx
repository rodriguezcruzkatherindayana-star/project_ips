import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  documentId: string;
  phone: string;
  eps: string;
  avatar?: string;
  birthDate?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  bloodType?: string;
  allergies?: string[];
  chronicConditions?: string[];
}

export interface Notification {
  id: string;
  type: 'reminder' | 'authorization' | 'result' | 'appointment' | 'general';
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  actionData?: {
    screen: string;
    itemId?: string;
    itemType?: string;
    data?: any;
  };
}

export interface NavigationHistory {
  screen: string;
  timestamp: number;
}

interface AppContextType {
  // User
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  
  // Navigation
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  navigationHistory: NavigationHistory[];
  goBack: () => void;
  canGoBack: boolean;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotification: (id: string) => void;
  unreadCount: number;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Load user from localStorage on mount
  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('integra_ips_user');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing stored user:', e);
          return null;
        }
      }
    }
    return null;
  });

  const [activeScreen, setActiveScreenState] = useState('dashboard');
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistory[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reminder',
      message: 'Recordatorio: Tomar medicamento Betahistina 16mg',
      time: 'Hace 2 horas',
      read: false,
      actionData: {
        screen: 'profile',
        itemType: 'medication'
      }
    },
    {
      id: '2',
      type: 'authorization',
      message: 'Autorización EPS aprobada para Implante Coclear',
      time: 'Hace 1 día',
      read: false,
      actionData: {
        screen: 'results',
        itemId: '1',
        itemType: 'authorization'
      }
    },
    {
      id: '3',
      type: 'result',
      message: 'Resultados de Audiometría Tonal disponibles',
      time: 'Hace 2 días',
      read: false,
      actionData: {
        screen: 'results',
        itemId: '1',
        itemType: 'result'
      }
    },
    {
      id: '4',
      type: 'result',
      message: 'Resultados de Videonistagmografía disponibles',
      time: 'Hace 3 días',
      read: false,
      actionData: {
        screen: 'results',
        itemId: '3',
        itemType: 'result'
      }
    },
    {
      id: '5',
      type: 'appointment',
      message: 'Cita confirmada con Dr. Carlos Mendoza - 20 Dic 2024',
      time: 'Hace 4 días',
      read: true,
      actionData: {
        screen: 'appointments',
        itemId: '1',
        itemType: 'appointment'
      }
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentUser) {
        localStorage.setItem('integra_ips_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('integra_ips_user');
      }
    }
  }, [currentUser]);

  const setActiveScreen = (screen: string) => {
    setNavigationHistory(prev => [
      ...prev,
      { screen: activeScreen, timestamp: Date.now() }
    ]);
    setActiveScreenState(screen);
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setActiveScreenState(previousScreen.screen);
    }
  };

  const canGoBack = navigationHistory.length > 0;

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const updateUserProfile = (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        ...updates
      };
      setCurrentUserState(updatedUser);
    }
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser: setCurrentUserState,
    updateUserProfile,
    activeScreen,
    setActiveScreen,
    navigationHistory,
    goBack,
    canGoBack,
    notifications,
    addNotification,
    markNotificationAsRead,
    clearNotification,
    unreadCount,
    isLoading,
    setIsLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};