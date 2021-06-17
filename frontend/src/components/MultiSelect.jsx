import React from 'react';
import {
  Autocomplete, Typography, TextField
} from '@material-ui/core';
import { withGridItem } from './withGridItem';

const Multi = React.forwardRef(({
  value,
  onChange,
  label,
  fullWidth = true,
  options = [],
  labelField = 'label',
  valueField = '_id',
  helperText = '',
  loading = false,
}, ref) => (
  <Autocomplete
    ref={ref}
    disableListWrap
    options={options || []}
    loading={loading}
    fullWidth={fullWidth}
    value={value}
    onChange={(e, v) => onChange(v)}
    style={{
      minWidth: '200px'
    }}
    multiple
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        helperText={helperText}
      />
    )}
    getOptionSelected={(option, value) => option[valueField] === value[valueField]}
    getOptionLabel={option => option?.[labelField]}
    renderOption={(props, option) => (
      <li {...props}>
        <Typography noWrap>{option[labelField]}</Typography>
      </li>
    )}
  />
))


export const MultiSelect = withGridItem(Multi);