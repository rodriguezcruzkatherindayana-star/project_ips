import React, { useState } from 'react';
import { Calendar, User, MessageCircle, FileText, Home, ArrowLeft } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { AppProvider, useApp } from './contexts/AppContext';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import integraLogoWhite from 'figma:asset/08c5c1af85ce2355fea326aac1e6034eb482b255.png';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { EpidemiologicalAnalysisScreen } from './components/EpidemiologicalAnalysisScreen';
import { AppointmentsScreen } from './components/AppointmentsScreen';
import { AppointmentDetailScreen } from './components/AppointmentDetailScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ChatScreen } from './components/ChatScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { NotificationPanel } from './components/NotificationPanel';
import { NotificationDetailModal } from './components/NotificationDetailModal';
import { LoadingOverlay } from './components/LoadingSpinner';
import { ScreenTransition } from './components/ScreenTransition';
import { BlogDetailScreen } from './components/BlogDetailScreen';
import { SpecializedServicesScreen } from './components/SpecializedServicesScreen';
import { ServiceDetailScreen } from './components/ServiceDetailScreen';
import { FullProfileScreen } from './components/profile/FullProfileScreen';
import { EditPersonalInfoScreen } from './components/profile/EditPersonalInfoScreen';
import { EditEmergencyContactScreen } from './components/profile/EditEmergencyContactScreen';
import { MedicalInfoScreen } from './components/profile/MedicalInfoScreen';
import { SecurityScreen } from './components/profile/SecurityScreen';
import { HelpScreen } from './components/profile/HelpScreen';
import { DoctorProfileScreen } from './components/DoctorProfileScreen';
import { VideoCallScreen } from './components/VideoCallScreen';
import { ResultDetailScreen } from './components/ResultDetailScreen';
import { getDoctorById } from './data/doctors';
import type { User as UserType } from './contexts/AppContext';
import type { NewsArticle } from './components/NewsCarousel';
import type { SpecializedService } from './components/SpecializedServicesScreen';
import type { Notification } from './contexts/AppContext';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedService, setSelectedService] = useState<SpecializedService | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedAppointmentForDetail, setSelectedAppointmentForDetail] = useState<any>(null);
  const [selectedResultForDetail, setSelectedResultForDetail] = useState<any>(null);
  
  const {
    currentUser,
    setCurrentUser,
    updateUserProfile,
    activeScreen,
    setActiveScreen,
    goBack,
    canGoBack,
    isLoading,
    clearNotification
  } = useApp();

  // Mock user data - only used for initial login
  const mockUser: UserType = {
    id: '1',
    name: 'María García Rodríguez',
    email: 'maria.garcia@email.com',
    role: 'patient',
    documentId: '1234567890',
    phone: '+57 300 123 4567',
    eps: 'Nueva EPS',
    birthDate: '1985-03-15',
    address: 'Calle 123 #45-67, Bogotá',
    emergencyContact: {
      name: 'Carlos García (Esposo)',
      phone: '+57 300 987 6543'
    },
    bloodType: 'O+',
    allergies: ['Penicilina', 'Mariscos'],
    chronicConditions: ['Hipertensión']
  };

  // Extended user profile data (for display purposes, includes data not in User type)
  const userProfileData = {
    ...(currentUser || mockUser),
    // Ensure we always have the required fields even if currentUser is missing them
    birthDate: currentUser?.birthDate || mockUser.birthDate,
    address: currentUser?.address || mockUser.address,
    emergencyContact: currentUser?.emergencyContact || mockUser.emergencyContact,
    bloodType: currentUser?.bloodType || mockUser.bloodType,
    allergies: currentUser?.allergies || mockUser.allergies,
    chronicConditions: currentUser?.chronicConditions || mockUser.chronicConditions,
    // Extended data not stored in localStorage
    currentMedications: [
      { name: 'Betahistina 16mg', frequency: 'Tres veces al día', time: '08:00, 14:00, 20:00', prescribedBy: 'Dr. Roberto Silva' },
      { name: 'Cetirizina 10mg', frequency: 'Una vez al día', time: '20:00', prescribedBy: 'Dr. Carlos Mendoza' }
    ],
    vaccinations: [
      { name: 'COVID-19 (Refuerzo)', date: '2024-09-15', place: 'Centro Médico Integra' },
      { name: 'Influenza', date: '2024-03-20', place: 'Centro Médico Integra' },
      { name: 'Tétanos', date: '2023-05-10', place: 'Hospital San José' }
    ],
    vitalSigns: {
      weight: '65 kg',
      height: '1.65 m',
      bmi: '23.9',
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      temperature: '36.5°C',
      lastUpdated: '2024-12-01'
    }
  };

  const handleUpdateProfile = (updates: any) => {
    updateUserProfile(updates);
    
    // Only show toast if not just updating avatar
    if (!updates.avatar || Object.keys(updates).length > 1) {
      toast.success('Perfil actualizado', {
        description: 'Los cambios se han guardado correctamente',
      });
      goBack();
    } else {
      toast.success('Foto de perfil actualizada', {
        description: 'Tu foto se ha guardado correctamente',
      });
    }
  };

  const handleSavePersonalInfo = (info: any) => {
    handleUpdateProfile(info);
  };

  const handleSaveEmergencyContact = (contact: any) => {
    handleUpdateProfile({ emergencyContact: contact });
  };

  const devices = [
    { name: 'iPhone 13 Pro', lastActive: 'Ahora', location: 'Bogotá, Colombia', current: true },
    { name: 'iPad Pro', lastActive: 'Hace 2 días', location: 'Bogotá, Colombia', current: false },
    { name: 'MacBook Air', lastActive: 'Hace 1 semana', location: 'Bogotá, Colombia', current: false }
  ];

  const handleLogin = (email: string, password: string) => {
    // Simulate API call
    setTimeout(() => {
      // Check if user data exists in localStorage
      const storedUser = localStorage.getItem('integra_ips_user');
      
      if (storedUser) {
        try {
          // Use stored user data if available
          const parsedUser = JSON.parse(storedUser);
          setCurrentUser(parsedUser);
          toast.success(`Bienvenida, ${parsedUser.name.split(' ')[0]}!`, {
            description: 'Has iniciado sesión correctamente',
          });
        } catch (e) {
          // If parsing fails, use mock user
          setCurrentUser(mockUser);
          toast.success('Bienvenida, María!', {
            description: 'Has iniciado sesión correctamente',
          });
        }
      } else {
        // No stored data, use mock user and it will be saved to localStorage
        setCurrentUser(mockUser);
        toast.success('Bienvenida, María!', {
          description: 'Has iniciado sesión correctamente',
        });
      }
    }, 500);
  };

  const handleRegister = (userData: any) => {
    const newUser: UserType = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'patient',
      documentId: userData.documentId,
      phone: userData.phone,
      eps: userData.eps
    };
    setCurrentUser(newUser);
    setShowRegister(false);
    toast.success('Registro exitoso!', {
      description: 'Tu cuenta ha sido creada correctamente',
    });
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveScreen('dashboard');
    toast.info('Sesión cerrada', {
      description: 'Has cerrado sesión correctamente',
    });
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationAction = (notification: Notification) => {
    // Open the notification detail modal
    setSelectedNotification(notification);
    setShowNotifications(false);
  };

  const handleCloseNotificationModal = () => {
    // If the notification is read, delete it
    if (selectedNotification) {
      clearNotification(selectedNotification.id);
    }
    setSelectedNotification(null);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showRegister) {
    return <RegisterScreen onRegister={handleRegister} onBackToLogin={handleBackToLogin} />;
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} onShowRegister={handleShowRegister} />;
  }

  const handleNavigateToEpidemiologicalAnalysis = () => {
    setActiveScreen('epidemiological-analysis');
  };

  const handleNavigateToNewAppointment = () => {
    setActiveScreen('new-appointment');
  };

  const handleNavigateToResults = () => {
    setActiveScreen('results');
  };

  const handleNavigateToBlog = (article: NewsArticle) => {
    setSelectedArticle(article);
    setActiveScreen('blog-detail');
  };

  const handleNavigateToServices = () => {
    setActiveScreen('specialized-services');
  };

  const handleNavigateToServiceDetail = (service: SpecializedService) => {
    setSelectedService(service);
    setActiveScreen('service-detail');
  };

  const handleBackToDashboard = () => {
    if (canGoBack) {
      goBack();
    } else {
      setActiveScreen('dashboard');
    }
  };

  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
  };

  const handleNavigateToDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setActiveScreen('doctor-profile');
  };

  // Función para obtener el título de cada pantalla
  const getScreenTitle = (screen: string): string => {
    switch (screen) {
      case 'appointments':
        return 'Citas';
      case 'appointment-detail':
        return 'Detalle de la cita';
      case 'new-appointment':
        return 'Agendar Cita';
      case 'results':
        return 'Resultados';
      case 'result-detail':
        return 'Detalle del resultado';
      case 'chat':
        return 'Chat';
      case 'profile':
        return 'Configuración';
      case 'epidemiological-analysis':
        return 'Análisis Epidemiológico';
      case 'blog-detail':
        return 'Blog';
      case 'specialized-services':
        return 'Servicios Especializados';
      case 'service-detail':
        return 'Detalle del Servicio';
      case 'profile-full':
        return 'Perfil Completo';
      case 'edit-personal-info':
        return 'Editar Información';
      case 'edit-emergency-contact':
        return 'Editar Contacto';
      case 'profile-blood':
        return 'Tipo de Sangre';
      case 'profile-allergies':
        return 'Alergias';
      case 'profile-conditions':
        return 'Condiciones Crónicas';
      case 'profile-medications':
        return 'Medicamentos';
      case 'profile-vaccinations':
        return 'Vacunas';
      case 'profile-password':
        return 'Cambiar Contraseña';
      case 'profile-2fa':
        return 'Autenticación 2FA';
      case 'profile-devices':
        return 'Dispositivos';
      case 'profile-privacy':
        return 'Privacidad';
      case 'profile-download':
        return 'Descargar Historia';
      case 'profile-share':
        return 'Compartir Perfil';
      case 'profile-policies':
        return 'Políticas de Privacidad';
      case 'profile-faq':
        return 'Preguntas Frecuentes';
      case 'profile-help':
        return 'Centro de Ayuda';
      case 'profile-rate':
        return 'Calificar App';
      case 'doctor-profile':
        return 'Perfil del Doctor';
      case 'video-call':
        return 'Llamada Video';
      default:
        return 'Integra IPS';
    }
  };

  // Función para determinar si mostrar botón de retroceso
  const showBackButton = (): boolean => {
    const screensWithBack = [
      'epidemiological-analysis', 
      'new-appointment', 
      'appointment-detail',
      'result-detail',
      'blog-detail', 
      'specialized-services', 
      'service-detail',
      'profile-full',
      'edit-personal-info',
      'edit-emergency-contact',
      'profile-blood',
      'profile-allergies',
      'profile-conditions',
      'profile-medications',
      'profile-vaccinations',
      'profile-password',
      'profile-2fa',
      'profile-devices',
      'profile-privacy',
      'profile-download',
      'profile-share',
      'profile-policies',
      'profile-faq',
      'profile-help',
      'profile-rate',
      'doctor-profile'
    ];
    return screensWithBack.includes(activeScreen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return (
          <ScreenTransition key="dashboard">
            <DashboardScreen
              user={currentUser}
              onNavigate={handleNavigate}
              onNavigateToArticle={(article) => {
                setSelectedArticle(article);
                setActiveScreen('article-detail');
              }}
              onNavigateToService={(service) => {
                setSelectedService(service);
                setActiveScreen('service-detail');
              }}
              onDoctorClick={handleNavigateToDoctor}
              onNavigateToEpidemiologicalAnalysis={handleNavigateToEpidemiologicalAnalysis}
              onToggleNotifications={handleToggleNotifications}
              onNotificationClick={handleNotificationAction}
              onNavigateToAppointmentDetail={(appt) => {
                setSelectedAppointmentForDetail(appt);
                setActiveScreen('appointment-detail');
              }}
              onNavigateToResultDetail={(result) => {
                setSelectedResultForDetail(result);
                setActiveScreen('result-detail');
              }}
            />
          </ScreenTransition>
        );
      case 'epidemiological-analysis':
        return (
          <ScreenTransition key="epidemiological-analysis">
            <EpidemiologicalAnalysisScreen onBack={handleBackToDashboard} />
          </ScreenTransition>
        );
      case 'appointments':
        return (
          <ScreenTransition key="appointments">
            <AppointmentsScreen 
              user={currentUser} 
              onDoctorClick={handleNavigateToDoctor} 
              onViewAppointmentDetail={(appt) => {
                setSelectedAppointmentForDetail(appt);
                setActiveScreen('appointment-detail');
              }}
            />
          </ScreenTransition>
        );
      case 'appointment-detail':
        return selectedAppointmentForDetail ? (
          <ScreenTransition key="appointment-detail">
            <AppointmentDetailScreen 
              appointment={selectedAppointmentForDetail} 
              user={currentUser}
            />
          </ScreenTransition>
        ) : null;
      case 'result-detail':
        return selectedResultForDetail ? (
          <ScreenTransition key="result-detail">
            <ResultDetailScreen 
              result={selectedResultForDetail}
              onDoctorClick={handleNavigateToDoctor}
            />
          </ScreenTransition>
        ) : null;
      case 'new-appointment':
        return (
          <ScreenTransition key="new-appointment">
            <AppointmentsScreen 
              user={currentUser} 
              showNewAppointmentForm={true} 
              onDoctorClick={handleNavigateToDoctor} 
              onViewAppointmentDetail={(appt) => {
                setSelectedAppointmentForDetail(appt);
                setActiveScreen('appointment-detail');
              }}
            />
          </ScreenTransition>
        );
      case 'results':
        return (
          <ScreenTransition key="results">
            <ResultsScreen 
              user={currentUser} 
              onDoctorClick={handleNavigateToDoctor} 
              onViewResultDetail={(result) => {
                setSelectedResultForDetail(result);
                setActiveScreen('result-detail');
              }}
            />
          </ScreenTransition>
        );
      case 'chat':
        return (
          <ScreenTransition key="chat">
            <ChatScreen user={currentUser} />
          </ScreenTransition>
        );
      case 'profile':
        return (
          <ScreenTransition key="profile">
            <ProfileScreen user={currentUser} onLogout={handleLogout} />
          </ScreenTransition>
        );
      case 'blog-detail':
        return selectedArticle ? (
          <ScreenTransition key="blog-detail">
            <BlogDetailScreen article={selectedArticle} onBack={handleBackToDashboard} />
          </ScreenTransition>
        ) : null;
      case 'specialized-services':
        return (
          <ScreenTransition key="specialized-services">
            <SpecializedServicesScreen 
              onServiceClick={handleNavigateToServiceDetail}
              onBackToHome={() => setActiveScreen('dashboard')}
            />
          </ScreenTransition>
        );
      case 'service-detail':
        return selectedService ? (
          <ScreenTransition key="service-detail">
            <ServiceDetailScreen 
              service={selectedService} 
              onBack={handleBackToDashboard}
            />
          </ScreenTransition>
        ) : null;
      
      // Profile screens
      case 'profile-full':
        return (
          <ScreenTransition key="profile-full">
            <FullProfileScreen 
              userProfile={userProfileData} 
              onNavigate={setActiveScreen} 
              onUpdateProfile={handleUpdateProfile}
            />
          </ScreenTransition>
        );
      case 'edit-personal-info':
        return (
          <ScreenTransition key="edit-personal-info">
            <EditPersonalInfoScreen 
              userProfile={userProfileData} 
              onSave={handleSavePersonalInfo} 
              onCancel={handleBackToDashboard}
            />
          </ScreenTransition>
        );
      case 'edit-emergency-contact':
        return (
          <ScreenTransition key="edit-emergency-contact">
            <EditEmergencyContactScreen 
              emergencyContact={userProfileData.emergencyContact} 
              onSave={handleSaveEmergencyContact} 
              onCancel={handleBackToDashboard}
            />
          </ScreenTransition>
        );
      case 'profile-blood':
        return (
          <ScreenTransition key="profile-blood">
            <MedicalInfoScreen type="blood" bloodType={userProfileData.bloodType} />
          </ScreenTransition>
        );
      case 'profile-allergies':
        return (
          <ScreenTransition key="profile-allergies">
            <MedicalInfoScreen type="allergies" allergies={userProfileData.allergies} />
          </ScreenTransition>
        );
      case 'profile-conditions':
        return (
          <ScreenTransition key="profile-conditions">
            <MedicalInfoScreen type="conditions" chronicConditions={userProfileData.chronicConditions} />
          </ScreenTransition>
        );
      case 'profile-medications':
        return (
          <ScreenTransition key="profile-medications">
            <MedicalInfoScreen type="medications" currentMedications={userProfileData.currentMedications} />
          </ScreenTransition>
        );
      case 'profile-vaccinations':
        return (
          <ScreenTransition key="profile-vaccinations">
            <MedicalInfoScreen type="vaccinations" vaccinations={userProfileData.vaccinations} />
          </ScreenTransition>
        );
      case 'profile-password':
        return (
          <ScreenTransition key="profile-password">
          <SecurityScreen type="password" />
        </ScreenTransition>
        );
      case 'profile-2fa':
        return (
          <ScreenTransition key="profile-2fa">
            <SecurityScreen type="2fa" />
          </ScreenTransition>
        );
      case 'profile-devices':
        return (
          <ScreenTransition key="profile-devices">
            <SecurityScreen type="devices" devices={devices} />
          </ScreenTransition>
        );
      case 'profile-privacy':
        return (
          <ScreenTransition key="profile-privacy">
            <SecurityScreen type="privacy" />
          </ScreenTransition>
        );
      case 'profile-download':
        return (
          <ScreenTransition key="profile-download">
            <HelpScreen type="download" email={currentUser?.email} />
          </ScreenTransition>
        );
      case 'profile-share':
        return (
          <ScreenTransition key="profile-share">
            <HelpScreen type="share" />
          </ScreenTransition>
        );
      case 'profile-policies':
        return (
          <ScreenTransition key="profile-policies">
            <HelpScreen type="policies" />
          </ScreenTransition>
        );
      case 'profile-faq':
        return (
          <ScreenTransition key="profile-faq">
            <HelpScreen type="faq" />
          </ScreenTransition>
        );
      case 'profile-help':
        return (
          <ScreenTransition key="profile-help">
            <HelpScreen type="help" />
          </ScreenTransition>
        );
      case 'profile-rate':
        return (
          <ScreenTransition key="profile-rate">
            <HelpScreen type="rate" />
          </ScreenTransition>
        );
      case 'doctor-profile':
        return selectedDoctorId ? (
          <ScreenTransition key="doctor-profile">
            <DoctorProfileScreen 
              doctor={getDoctorById(selectedDoctorId)!} 
              onBookAppointment={handleNavigateToNewAppointment}
            />
          </ScreenTransition>
        ) : null;
      
      case 'video-call':
        return (
          <ScreenTransition key="video-call">
            <VideoCallScreen 
              onEndCall={() => setActiveScreen('appointments')}
            />
          </ScreenTransition>
        );
      
      default:
        return (
          <ScreenTransition key="dashboard-default">
            <DashboardScreen 
              user={currentUser} 
              onNavigateToEpidemiologicalAnalysis={handleNavigateToEpidemiologicalAnalysis}
              onNavigateToAppointments={handleNavigateToNewAppointment}
              onNavigateToResults={handleNavigateToResults}
              onNavigateToBlog={handleNavigateToBlog}
              onNavigateToServices={handleNavigateToServices}
              onNavigateToServiceDetail={handleNavigateToServiceDetail}
              onToggleNotifications={handleToggleNotifications}
              onNotificationClick={handleNotificationAction}
              onNavigateToAppointmentDetail={(appt) => {
                setSelectedAppointmentForDetail(appt);
                setActiveScreen('appointment-detail');
              }}
              onNavigateToResultDetail={(result) => {
                setSelectedResultForDetail(result);
                setActiveScreen('result-detail');
              }}
            />
          </ScreenTransition>
        );
    }
  };

  return (
    <>
      {/* Mobile Container - Centered with max width */}
      <div className="min-h-screen bg-gray-100 flex justify-center overflow-x-hidden">
        <div className="w-full max-w-md bg-gray-50 relative min-h-screen shadow-xl overflow-x-hidden">
          {/* Header - Hidden during video call */}
          {activeScreen !== 'video-call' && activeScreen !== 'appointment-detail' && activeScreen !== 'result-detail' && (
          <div className="bg-blue-500 text-white">
            {/* Status bar simulation */}
            <div className="flex justify-between items-center px-5 pt-2 pb-1 text-sm">
              <div className="flex items-center gap-1">
                <span>{new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs">4.5G</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 border border-white/60 rounded-sm">
                    <div className="w-3/4 h-full bg-white rounded-sm"></div>
                  </div>
                  <span className="text-xs">85%</span>
                </div>
              </div>
            </div>
            
            {/* Main header content - height ~96-112px total */}
            <div className="px-5 pt-2 pb-6">
              <div className="flex items-center gap-3 min-h-[56px]">
                {/* Botón de retroceso */}
                {showBackButton() && (
                  <button
                    onClick={handleBackToDashboard}
                    className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-all active:bg-white/40 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Volver atrás"
                  >
                    <ArrowLeft className="h-6 w-6 text-white" />
                  </button>
                )}
                
                {/* Logo/Título */}
                {activeScreen === 'dashboard' ? (
                  <ImageWithFallback
                    src={integraLogoWhite} 
                    alt="Integra IPS" 
                    className="h-14 w-auto filter brightness-0 invert"
                    fallback={
                      <h1 className="text-2xl font-semibold text-white">Integra IPS</h1>
                    }
                  />
                ) : (
                  <h1 className="text-2xl font-semibold text-white">
                    {getScreenTitle(activeScreen)}
                  </h1>
                )}
              </div>
            </div>
          </div>
          )}

          {/* Main Content */}
          <div className={activeScreen !== 'video-call' ? 'pb-20 overflow-x-hidden' : 'overflow-x-hidden'}>
            {renderScreen()}
          </div>

          {/* Bottom Navigation - Hidden during video call */}
          {activeScreen !== 'video-call' && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t shadow-elevated px-2 py-2 z-30" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
            <div className="flex justify-around items-center">
            <button
              onClick={() => handleNavigate('dashboard')}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-h-[56px] min-w-[56px] ${
                activeScreen === 'dashboard' 
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-500 active:bg-gray-50'
              }`}
              aria-label="Inicio"
              aria-current={activeScreen === 'dashboard' ? 'page' : undefined}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs font-medium mt-1">Inicio</span>
            </button>
            
            <button
              onClick={() => handleNavigate('appointments')}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-h-[56px] min-w-[56px] ${
                activeScreen === 'appointments' || activeScreen === 'new-appointment'
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-500 active:bg-gray-50'
              }`}
              aria-label="Citas"
              aria-current={activeScreen === 'appointments' ? 'page' : undefined}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-xs font-medium mt-1">Citas</span>
            </button>
            
            <button
              onClick={() => handleNavigate('results')}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-h-[56px] min-w-[56px] ${
                activeScreen === 'results' 
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-500 active:bg-gray-50'
              }`}
              aria-label="Resultados"
              aria-current={activeScreen === 'results' ? 'page' : undefined}
            >
              <FileText className="h-6 w-6" />
              <span className="text-xs font-medium mt-1">Resultados</span>
            </button>
            
            <button
              onClick={() => handleNavigate('chat')}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-h-[56px] min-w-[56px] ${
                activeScreen === 'chat' 
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-500 active:bg-gray-50'
              }`}
              aria-label="Chat"
              aria-current={activeScreen === 'chat' ? 'page' : undefined}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-xs font-medium mt-1">Chat</span>
            </button>
            
            <button
              onClick={() => handleNavigate('profile')}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-h-[56px] min-w-[56px] ${
                activeScreen === 'profile' 
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-500 active:bg-gray-50'
              }`}
              aria-label="Configuración"
              aria-current={activeScreen === 'profile' ? 'page' : undefined}
            >
              <User className="h-6 w-6" />
              <span className="text-xs font-medium mt-1">Configuración</span>
            </button>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay message="Cargando..." />}

      {/* Notification Panel - Shows all notifications */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)}
        onNotificationClick={handleNotificationAction}
      />

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <NotificationDetailModal 
          notification={selectedNotification}
          onClose={handleCloseNotificationModal}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}