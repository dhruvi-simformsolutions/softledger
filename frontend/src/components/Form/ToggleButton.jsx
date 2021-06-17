import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { 
  Button
} from '@material-ui/core';
import { useForm } from './Context';


export const ToggleButton = () => {
  const {
    customButton,
    onOpen,
    buttonIcon,
  } = useForm();

  if(customButton) return customButton(onOpen);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onOpen}
      startIcon={buttonIcon ? buttonIcon : <AddIcon />}
    >
      New
    </Button>
  )
}