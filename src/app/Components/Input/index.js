import { TextField } from '@mui/material'
import React from 'react'

const Input = ({ id, type, name, disabled, value, placeholder, label, onChange, onBlur, helperText, error, variant = "standard", ...rest }) => {
    return (
        <TextField
            fullWidth
            type={type}
            id={id}
            label={label}
            variant={variant}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            helperText={helperText}
            error={error}
            disabled={disabled}
            {...rest}
        />
    )
}

export default Input