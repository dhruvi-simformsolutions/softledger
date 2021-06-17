import React from 'react';
import {FormControlLabel} from '@material-ui/core';
import MuiSwitch from '@material-ui/core/Switch';
import {withGridItem} from './withGridItem';

const _Switch = ({
  label,
  ...props
}) => (
  <FormControlLabel
    label={label}
    control={
      <MuiSwitch
        {...props}
      />
    }
  />
)

export const Switch = withGridItem(_Switch);