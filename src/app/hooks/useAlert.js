import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { capitalizeFirstLetter } from "dhavaltank-js-utils";

const AlertContext = createContext();
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

export const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const showAlert = (newMessage, newSeverity = "success") => {
        setMessage(newMessage);
        setSeverity(newSeverity);
        setOpen(true);
    };

    const hideAlert = () => {
        setOpen(false);
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={hideAlert}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={hideAlert} severity={severity}>
                    {capitalizeFirstLetter(message)}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
