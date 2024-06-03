import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AutocompleteInput = ({
    options,
    value,
    onChange,
    isOptionEqualToValue,
    getOptionLabel,
    variant = "standard",
    label,
    error,
    required = true,
    helperText,
    onBlur,
    name,
    id,
    ...restProps
}) => {
    let [search, setSearch] = useState("");

    useEffect(() => {
        setSearch("")
    }, [value]);

    const handleOnBlur = (e) => {
        setSearch("");
    }

    return (
        <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            value={value || ""}
            autoComplete
            autoSelect
            disableClearable={search?.length > 0 ? false : value?.length ? false : true}
            clearOnBlur
            onBlur={handleOnBlur}
            handleHomeEndKeys
            onChange={(event, newValue) => onChange(newValue)}
            name={name}
            id={id}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant={variant}
                    error={error}
                    helperText={helperText}
                    required={required}
                    onChange={(e) => {
                        setSearch(e.target?.value)
                    }}
                />
            )}
            isOptionEqualToValue={isOptionEqualToValue}
            {...restProps}
        />
    );
};

export default AutocompleteInput;