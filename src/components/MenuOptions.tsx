import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation"
import { useStylesGlobal } from '../Styles';
import { CloseMenuButton } from './Buttons';
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes";

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    onData?: (data: { option: string, open: boolean }) => void;
    setVisibleManagePerfil: (visible: boolean) => void;
}

export default function MenuOptions({ 
    open, 
    handleClose,  
    onData, 
    setVisibleManagePerfil,
}: ChildProps) {
    
    const { classes } = useStylesGlobal()
    const breakpointLG = useMediaQuery('(min-width:1024px)');
    // const navigate = useNavigate();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const close = () => {
        handleClose(false)
    }

    const selOp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const buttonElement = e.currentTarget.value 
        // onData({option:buttonElement, open: true})
        setVisibleManagePerfil(true)
        handleClose(false)
    }

    const navigateAdmin = () => {
        // navigate('/administrator')
        window.location.reload(); // Force a full page refresh
    }

    function wait(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const closeSession = async() => {

        try {
            // await wait(2000); // ⏱️ You can tweak this (e.g., 2000ms if needed)
            await signOut({ redirect: false })
            await wait(2000); // ⏱️ You can tweak this (e.g., 2000ms if needed)
            router.push('/login');
            // await wait(2000000); // ⏱️ You can tweak this (e.g., 2000ms if needed)
            // setUser(INITIAL_USER)
        } catch (error: unknown) {
            console.error('Logout error: ', error)
        } finally {
            // console.log("Previous navigate to login**********")
            // await wait(2000); // ⏱️ You can tweak this (e.g., 2000ms if needed)
            // console.log("Previous navigate to login**********")
            // navigate('/')
            router.push('/login');
        }
    }

    
    const  buttons = [
        // <Button value="fields" key="fields" variant="text" onClick={selOp}>Fields</Button>,
        <Button value="profile" key="profile" variant="text" onClick={selOp}>Perfil</Button>,
        // <Button value="preferences" key="preferences" variant="text" onClick={selOp}>Modo claro/oscuro</Button>,
       <Button
            key="preferences"
            variant="text"
            onClick={toggleTheme}
        >
                Modo {`${theme === "dark" ? "oscuro" : "claro"}`}
        </Button>,
        <Button value="logout" key="logout" variant="text" onClick={closeSession}>Cerrar sesión</Button>,
        <CloseMenuButton key="close" clicked={() => handleClose(true)} />
    ];
 
    const height_box = "35%"

    return (
        <Modal
            open={open} 
            onClose={close}
            sx={{ 
                backgroundColor: 'rgba(0, 0, 0, .5)',
                // '& .MuiBackdrop-root': { backgroundColor: breakpointLG ? 'rgba(0, 0, 0, 0)': ""} 
                '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0)'} 
            }} // Set the custom background color here
        > 
            <Box 
                className={`
                    ${classes.menu_options} 
                    ${classes[`${theme}_menu_options_color` as keyof typeof classes]} 
                    ${(breakpointLG ? 
                        `${classes.menu_options_LG} ${classes[`${theme}_background_color3` as keyof typeof classes]}` : 
                        `${classes.menu_options_SM} ${classes[`${theme}_main_background_colorDD` as keyof typeof classes]}`)}
                `}
                height={height_box}
            >
                <ButtonGroup 
                    orientation="vertical"  
                >
                    {buttons}
                </ButtonGroup>
            </Box>
        </Modal>
    )
}