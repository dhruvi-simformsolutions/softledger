import React, {useState} from 'react';
import {LoadingButton} from './LoadingButton';
import {Typography, Box, TextField} from '@material-ui/core';

export const TypeToConfirmButton = ({
  confirmText,
  confirmBody,
  ...props
}) => {
  const [text, setText] = useState('');

  const renderBody = () => (
    <Box>
      {confirmBody}
      <br /><br />
      <div>
        Please type <strong>{confirmText}</strong> to Confirm
      </div>
      <TextField
        fullWidth
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </Box>
  )

  return (
    <LoadingButton
      {...props}
      confirmMessage={renderBody()}
      confirmDisabled={(text && text.trim()) !== confirmText.trim()}
    />
  )

}