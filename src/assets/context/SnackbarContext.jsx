import { createContext, useState } from 'react';
import SimpleSnackbar from '../todoComponents/SimpleSnackbar';

const SnackbarContext = createContext();
export default SnackbarContext;

export const SnackbarContextProvider = ({ children }) => {
  
      const [open, setOpen] = useState(false);
      const [message, setMessage] = useState('');
    
      const handleOpenSnackbar = () => {
        setOpen(true);
    
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      };

    return (
        <SnackbarContext.Provider value={{ handleOpenSnackbar, setMessage }}>
            <SimpleSnackbar open={open} message={message} />
            {children}
        </SnackbarContext.Provider>
    )
} 