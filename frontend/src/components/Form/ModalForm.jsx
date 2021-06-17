import React from 'react';
import { 
  Dialog, DialogContent, DialogTitle, DialogActions,
} from '@material-ui/core';
import {ToggleButton} from './ToggleButton';
import {ModalActions} from './ModalActions';
import {SubmitError} from './SubmitError';
import { useForm } from './Context';

//handles the case where the modal is open from a MenuItem
const stopPropagationForTab = (event) => {
  if (event.key === "Tab") {
    event.stopPropagation();
  }
};

export const ModalForm = props => {
  const {
    open,
    header,
    onClose,
    cancelClose,
    dialogWidth,
  } = useForm();

  return (
    <div>
      <ToggleButton />
      <Dialog
        onKeyDown={stopPropagationForTab}
        maxWidth={dialogWidth}
        open={open}
        onClose={cancelClose ? null : onClose}
        PaperProps={{
          style: {
            overflowY: 'visible'
          }
        }}
      >
        {open ? (
          <>
            <DialogTitle>
              {header}
            </DialogTitle>
            <DialogContent>
              {props.children}
              <SubmitError />
            </DialogContent>
            <DialogActions>
              <ModalActions  />
            </DialogActions>
          </>
        ) : <></>}
      </Dialog>
    </div>
  )
}