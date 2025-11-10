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

const linkColor = '#c1e8fb';  // Is used without a user so it should be only one
const mainColor = 'rgb(45, 72, 91, 1)';
const mainColorLighter = 'rgb(115, 142, 161, 1)';
const mainColor3 = 'rgb(38,55, 66, 1)'; // is used just in the menu options with large screens
const mainColorD = 'rgb(25, 54, 72)';
const tableAlertOnBackground = 'rgb(290, 10, 50, .6)';
const tableAlertOnColor = 'rgb(255, 255, 255, 1)';
const tableRowColor = '#222';
const rowEvenBackground = 'rgb(69, 144, 186)';
const rowOddBackground = 'rgb(162, 199, 220)';
const menuItem = '#DCF2F1';

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
    table_menu : {
        borderRadius: '4px', // Set border-radius to mimic scrollbar radius
        '& .MuiPaper-root': {  
            overflow: 'hidden', // Hide any overflow
            overflowY: 'auto', // Show scrollbar on hover
            borderRadius: '4px', // Set border-radius to mimic scrollbar radius
            // paddingRight: '12px',
            scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
            scrollbarWidth: 'thin', // Hide scrollbar for Firefox
            '&:hover': {
                scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                overflowY: 'auto', // Show scrollbar on hover
                // paddingRight: '0',
                overflowX: 'hidden',
            },
        },
    },
    table_menu_background_color : {
        '& .MuiPaper-root': { 
            backgroundColor: menuItem,
            '&:hover': {
                backgroundColor: menuItem,
             },
        },
    },
    menu_item: {
        padding: '0 5px',
    },
    menu_item_background_color: {
        backgroundColor: menuItem,
        '&:hover': {
            backgroundColor: menuItem,
        },
    },
    main_background_colorD: {
        backgroundColor: mainColorD,
    },
    table_header_color: {
        color: tableHeaderColor,
        '&.Mui-checked': {
            color: tableHeaderColor,
        },
    },
})