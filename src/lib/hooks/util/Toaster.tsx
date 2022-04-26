import { 
  ReactChild, 
  ReactFragment, 
  ReactNode, 
  ReactPortal, 
  useCallback } from 'react';
  
import { toast, ToastContentProps } from 'react-toastify';

const ToasterHook = () => {

  const toasty = useCallback((message: boolean | ReactChild | 
    ReactFragment | ReactPortal | ((props: ToastContentProps<{}>) => 
    ReactNode) | null | undefined) => {
    if (message) toast(message);
  }, []);

  return { toasty };
};

export default ToasterHook;