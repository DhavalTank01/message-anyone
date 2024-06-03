import React from 'react'
import { Button as MuiButton } from '@mui/joy/';
import CircularProgress from '@mui/joy/CircularProgress';
import { titleCase } from 'dhavaltank-js-utils';

const Button = ({ icon, text = "save", isLoading = false, disabled = false, type, onClick, variant = "outlined", ...rest }) => {
    return (
        <MuiButton
            startDecorator={!!isLoading ? <CircularProgress variant="solid" /> : null}
            type={type}
            disabled={disabled || isLoading}
            variant={variant}
            onClick={onClick}
            {...rest}
        >
            {!!icon ? icon : null}
            {!!text ? titleCase(text) : null}
        </MuiButton>
    )
}

export default Button;