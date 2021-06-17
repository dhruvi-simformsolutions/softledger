import React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import {withGridItem} from './withGridItem';

const _TextField = React.forwardRef(({
  value,
  variant="outlined",
  fullWidth=true,
  margin="dense",
  ...props
}, ref) => {
  
  const cleanValue = v => {
    if(!v && v !== 0) return '';
    return v;
  }

  return (
    <MuiTextField
      ref={ref}
      variant={variant}
      fullWidth={fullWidth}
      margin={margin}
      size="small"
      error={props.errors && props.errors.length ? true : undefined}
      helperText={props.errors}      
      value={cleanValue(value)}
      {...props}
    />
  )
})


export const TextField = withGridItem(_TextField);