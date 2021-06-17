import React from 'react';
import {SplitButton} from '../SplitButton';
import { 
  Button, CircularProgress
} from '@material-ui/core';
import { useForm } from './Context';

const Cancel = () => {
  const {
    onCancel,
    onClose,
  } = useForm();

  return (
    <Button
      onClick={onCancel || onClose}
    >
      Cancel
    </Button>
  )

}

const Submit = () => {
  const {
    submitting,
    onSubmit,
    onSubmitAndNew,
    andNew,
    isValid,
  } = useForm();

  if(andNew) {
    return (
      <SplitButton
        disabled={!isValid || submitting}
        onSubmit={() => onSubmit(false)} //false for not add new
        variant="contained"
        options={[{
          label: 'Submit And New',
          onSubmit: onSubmitAndNew,
        }]}
      >
        {submitting ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
      </SplitButton>
    )
  }

  return (
    <Button
      disabled={!isValid || submitting}
      color="primary"
      variant="contained"
      onClick={() => onSubmit(false)}
    >
      {submitting ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
    </Button>
  )

}

export const ModalActions = () => {
  const {
    customActions,
    onClose,
  } = useForm();

  //probably a function with more 
  if(customActions) return customActions({
    onClose,
  });

  return (
    <>
      <Cancel />
      <Submit />
    </>
  )
}