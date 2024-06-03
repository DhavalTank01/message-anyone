import React, { useState } from 'react'
import { useAlert } from '../hooks/useAlert';
import { Box, Card, Grid, Typography } from '@mui/material';
import AutocompleteInput from '../Components/AutocompleteInput';
import CodeWithName from "../codeWithName.json";
import Input from '../Components/Input';
import Button from '../Components/Button';
import { capitalizeFirstLetter } from 'dhavaltank-js-utils';

const HomePage = () => {
    const showAlert = useAlert();
    let initialData = {
        text: "Test",
        number: "9904924102",
        countryCode: "+91"
    }
    const [details, setDetails] = useState(initialData);
    const [errors, setErrors] = useState({
        text: "",
        number: "",
        countryCode: ""
    });
    const [loading, setLoading] = useState({
        pageLoading: true,
        buttonLoading: false,
    })

    const handleCodeChange = (newValue) => {
        setDetails((prev) => ({
            ...prev,
            ['countryCode']: newValue?.dial_code,
        }));
    };

    const requiredField = (e, name, value) => {
        if (name === "number") {
            if (!value) {
                return "Required"
            } else if (value?.length < 10 || value?.length > 10) {
                return "Invalid mobile number";
            } else {
                return "";
            }
        } else if (!value) {
            return "Required";
        } else {
            return "";
        }
    }

    const handleBlur = (e) => {
        let { name, value, id } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: requiredField(null, name, value),
        }));
    }

    const handleChange = (e) => {
        handleBlur(e);
        let { name, value, } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateData = (obj) => {
        let updatedErrors = {};
        Object.keys(obj).forEach((key) => {
            if (!obj[key]) {
                updatedErrors[key] = "Required";
            }
        });
        setErrors((prev) => ({ ...prev, ...updatedErrors }));
        return Object.keys(updatedErrors)?.length;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading((prev) => ({ ...prev, buttonLoading: true }))
        if (!validateData(details)) {
            showAlert("Redirecting to web whatsapp...");
            let redirectUrl = `https://api.whatsapp.com/send/?phone=${details.countryCode.replace("+", "")}${details.number}&text=${details.text}&type=phone_number`
            console.log("🚀 ~ handleSubmit ~ redirectUrl:", redirectUrl)
            setTimeout(() => {
                window.open(redirectUrl, '_blank').focus();
                setLoading((prev) => ({ ...prev, buttonLoading: false }))
            }, 1000);
        } else {
            setLoading((prev) => ({ ...prev, buttonLoading: false }))
        }
    }

    return (
        <Box sx={{ backgroundColor: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", overflow: "none" }}>
            <Grid display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                <Card sx={{ p: 5, width: 400 }} >
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ mb: 2 }}>
                        <img alt="WhatsApp Main Page" src="/logo.png" />
                    </Box>
                    <Box sx={{ mb: 3 }} textAlign={"center"}>
                        <Typography variant='h4'>Message Anyone</Typography>
                        <Typography variant='span' sx={{ fontSize: "13px" }}>With Web Whatsapp</Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction={"column"} spacing={3}>
                            <Grid item xs={6}>
                                <AutocompleteInput
                                    options={CodeWithName}
                                    variant='outlined'
                                    label={"Country Code"}
                                    onChange={handleCodeChange}
                                    helperText={errors.countryCode}
                                    error={!!errors.countryCode}
                                    getOptionLabel={(option) => {
                                        return `${option?.name} ${option?.dial_code}`
                                    }}
                                    name="countryCode"
                                    id="countryCode"
                                    value={CodeWithName?.find(value => value?.dial_code === details?.countryCode) || null}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Input
                                    label={"Mobile Number"}
                                    variant='outlined'
                                    name="number"
                                    id="number"
                                    type="number"
                                    onChange={handleChange}
                                    error={!!errors?.number}
                                    helperText={errors?.number}
                                    value={details?.number}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Input
                                    label={"Message"}
                                    variant='outlined'
                                    name="text"
                                    id="text"
                                    type="text"
                                    onChange={handleChange}
                                    error={!!errors?.text}
                                    helperText={errors?.text}
                                    value={capitalizeFirstLetter(details?.text)}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type={"submit"}
                                    text='send'
                                    isLoading={loading.buttonLoading}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
        </Box>
    )
}

export default HomePage;
