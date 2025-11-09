import { makeStyles } from 'tss-react/mui';
import { createTheme } from '@mui/material/styles';

const mainColorDD = 'rgb(18, 35, 46, 1)';
const transparent = 'rgb(255, 255, 255, 0)';
const neutralMain = 'rgb(255, 255, 255, 1)';
const tableHeaderColor = 'rgb(255, 255, 255, 1)';
const first_color = '#414548';
const first_color2 = '#212528';
const first_color3 = '#2A2E31';
const second_color = '#4938CA';
const second_alpha_color = 'rgba(73, 56, 202, 0.75)';
const text_color = '#EEFBFB';

const third_soft_color1 ='#474C54';
const third_soft_color2 =' #353B42';
const white_color = '#FFFFFF';
const green = '#27B67D';
const green_hover = 'rgba(39, 182, 125, 0.35)';
const green2 = '#319F43';
  
const black_alpha_color = 'rgba(0, 0, 0, 0.7)';
const red = '#F5615D';
const red_hover = 'rgba(245, 97, 93, 0.35)';
const red2 = '#E33629';
const blue = '#587DBD';
const yellow = '#F8BD00';

export const useStylesGlobal = makeStyles()({
    
    menuIcon: {
      color: neutralMain,
      '& .MuiSvgIcon-root': {
        width: '64px',
        height: '44px',
      },
      display: 'flex',
    //   margin: "auto",
    //   marginRight: "0",
      borderRadius: "18px 18px 0px 0px",
    },
    menu_icon_color: {
        backgroundColor: first_color,
    },
    menu_appbar: {
        position: "fixed",
        left: 0,
        bottom: 0,
        height: '44px',
        display: "flex",
        justifyContent: "center", 
        boxShadow: 'none'
    },
    no_background_colorDD: {
        backgroundColor: transparent,
        boxShadow: "none",
    },
    main_colorDD: {
        color: tableHeaderColor,
    },
})