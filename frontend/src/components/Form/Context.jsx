import React, { useContext, useState, useEffect } from "react";
import {getError} from '../../util/error';

export const FormContext = React.createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  const onSubmit = async (andNew=false) => {
    setSubmitting(true);
    setError(null);    
    try {
      const res = await props.onSubmit();
      
      andNew ? onOpen() : onClose();
      return res;
    } catch(err) {
      if(!props.showErrorInModal) throw err;
      //handle in modal
      setError(getError(err, props.fallbackErrorMessage || 'Failed'));
    } 

    setSubmitting(false);
  }

  const onSubmitAndNew = async () => {
    return onSubmit(true);
  }
  
  const onClose = () => {
    if(props.onClose) props.onClose();
    setOpen(false);
  }

  const onOpen = () => {
    if(props.onOpen) props.onOpen();
    setError(null);
    setSubmitting(false);
    setOpen(true);
  }

  return (
    <FormContext.Provider
      value={{
        ...props,

        open,
        submitting,
        error,
        setError,
        
        onClose,
        onOpen,


        onSubmit,
        onSubmitAndNew,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
