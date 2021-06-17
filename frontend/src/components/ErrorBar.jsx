import React, {useState, useEffect} from 'react';
import Alert from '@material-ui/core/Alert';
import {IconButton, Collapse} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


export const ErrorBar = ({
  error,
  severity='error',
  onClose,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(error && !open) {
      setOpen(true)
    } else if(!error && open) {
      setOpen(false);
    }
  }, [error])

  if(!error) return <></>;

  return (
    <div
    >
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            onClose && (
              <IconButton
                color="inherit"
                size="small"
                onClick={() => onClose()}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )
          }
        >
          {error}
        </Alert>
      </Collapse>
    </div>
  )
}