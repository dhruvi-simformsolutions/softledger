import React from 'react';
import { useForm } from './Context';
import { ErrorBar } from '../ErrorBar';

export const SubmitError = () => {
  const { error, setError } = useForm();

  return (
    <ErrorBar
      error={error}
      onClose={() => setError(null)}
    />
  )
}