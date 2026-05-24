import React from 'react';
import { Bell, X, Calendar, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import type { Notification } from '../contexts/AppContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, onNotificationClick }) => {
  const { notifications, markNotificationAsRead, clearNotification } = useApp();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'authorization':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'result':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read first
    markNotificationAsRead(notification.id);
    
    // Open the notification detail
    if (onNotificationClick && notification.actionData) {
      onNotificationClick(notification);
      // The panel will remain open until the user closes the detail modal
      // When they close it, we'll delete the notification if it's read
    } else {
      // If no detail to show, just close after a delay and remove
      setTimeout(() => {
        clearNotification(notification.id);
      }, 300);
    }
  };

  const handleClearNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    clearNotification(id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={onClose}
          />

          {/* Panel - Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-700" />
                  <h3 className="text-gray-900">Todas las Notificaciones</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {notifications.length} {notifications.length === 1 ? 'notificación' : 'notificaciones'}
                </p>
                {notifications.length > 0 && (
                  <button
                    onClick={() => notifications.forEach(n => clearNotification(n.id))}
                    className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Limpiar todo
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification, index) => (
                    <motion.button
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full text-left p-4 hover:bg-blue-50 transition-colors relative ${
                        notification.read ? 'bg-gray-50/50' : 'bg-white'
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                      aria-label={`${notification.read ? '' : 'No leída: '}${notification.message}`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleClearNotification(e, notification.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClearNotification(e as any, notification.id); }}
                        className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition-colors z-10 cursor-pointer"
                        aria-label={`Eliminar notificación: ${notification.message}`}
                      >
                        <X className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />
                      </div>

                      <div className="flex items-start gap-3 pr-8">
                        <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm pr-2 ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1.5">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" aria-label="No leída" role="status"></div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes notificaciones</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};