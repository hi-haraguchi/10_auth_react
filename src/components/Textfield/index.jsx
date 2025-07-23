import React from 'react';
import { Box, TextField as MuiTextField } from '@mui/material'; 

const Textfield = ({ label = "Standard", name, type = "text", value, onChange ,multiline, rows, inputProps, error, helperText, ...rest  }) => {
  return (
    <Box
      sx={{ '& > :not(style)': { m: 1, width: '60ch' } }}
      noValidate
      autoComplete="off"
    >
      <MuiTextField
        id={`standard-basic-${name}`} // 各TextFieldにユニークなIDを設定
        label={label}
        variant="standard"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        fullWidth 
        multiline={multiline}
        rows={rows} 
        {...inputProps}
        error={error} 
        helperText={helperText} 
        {...rest}
      />
    </Box>
  );
};

export default Textfield;