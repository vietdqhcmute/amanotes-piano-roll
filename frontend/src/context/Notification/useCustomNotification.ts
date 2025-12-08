import { useContext } from 'react';
import NotificationContext from './NotificationContex';

const useCustomNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
};

export default useCustomNotification;
