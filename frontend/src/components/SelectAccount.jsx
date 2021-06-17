import React, {useEffect, useState} from 'react';
import {
  Autocomplete
} from '@material-ui/core';
import { withGridItem } from './withGridItem';
import * as api from '../services/api';
import {TextField} from './TextField';

const Select = React.forwardRef(({
  value,
  onChange,
  label,
  fullWidth = true,
  valueField = 'id',
  loading = false,
  errors,
}, ref) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    api.Accounts.all().then(({data}) => setOptions(data));
  }, [setOptions])
  
  return (
    <Autocomplete
      ref={ref}
      disableListWrap
      options={options || []}
      loading={loading}
      fullWidth={fullWidth}
      value={value || null}
      onChange={(e, v) => onChange(v)}
      margin="dense"
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          errors={errors}   
        />
      )}
      getOptionSelected={(option, value) => option[valueField] === value[valueField]}
      getOptionLabel={option => option.number + ' - ' + option.name}
    />
  )
})

export const SelectAccount = withGridItem(Select);