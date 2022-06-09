import { 
  ReactChild, 
  ReactFragment, 
  ReactNode, 
  ReactPortal } from 'react';
  
import { toast, ToastContentProps } from 'react-toastify';

const ToasterHook = () => {

  const toasty = ((message: boolean | ReactChild | 
    ReactFragment | ReactPortal | ((props: ToastContentProps<{}>) => 
    ReactNode) | null | undefined) => {
    if (message) toast(message);
  });

  return { toasty };
};

export default ToasterHook;