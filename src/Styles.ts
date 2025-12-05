import { makeStyles } from 'tss-react/mui';
import { createTheme } from '@mui/material/styles';

const mainColorDD = 'rgb(18, 35, 46, 1)';
const transparent = 'rgb(255, 255, 255, 0)';
const neutralMain = 'rgb(255, 255, 255, 1)';
const tableHeaderColor = 'rgb(255, 255, 255, 1)';
const first_color = '#414548';
const first_color2 = '#212528';
const first_color3 = '#2A2E31';
const first_color4 = '#0b3555ff';
const second_color = '#4938CA';
const second_alpha_color = 'rgba(73, 56, 202, 0.75)';
const text_color = '#EEFBFB';

const third_soft_color1 ='#757b86ff';
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

const succesMain = 'rgb(32, 205, 60, 1)';
const succesContrastText = 'rgb(32, 205, 60, .2)';
const succesDark = 'rgb(2, 145, 10, 1)';
const warningMain = 'rgb(255, 47, 47, 1)';
const warningContrastText = 'rgb(255, 47, 47, .2)';
const warningDark = 'rgb(155, 27, 27, 1)';
const neutralContrastText = 'rgb(255, 255, 255, .2)';
const neutralDark = 'rgb(155, 155, 155, 1)';
const plusIcon = 'rgb(77, 168, 218, 1)';

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
        backgroundColor: first_color4,
    },
    table_header_color: {
        color: tableHeaderColor,
        '&.Mui-checked': {
            color: tableHeaderColor,
        },
    },
    page: {
      // display: "flex",
      // justifyContent: "center",
    },
    table_rows : {
        padding: "8px 0",
        border: 0,
    },
    table_rows_color : {
        color: tableHeaderColor,
    },table_row_even: {
        backgroundColor: third_soft_color1, 
    },
    table_row_odd: {
        backgroundColor: third_soft_color2, 
    },table_alert_on_background : {
        backgroundColor: tableAlertOnBackground, 
    },
    // table_alert_on_color : {
    //     color: tableAlertOnColor,
    // },
    plusIcon: {
      display: "flex",
      // margin: "0 5px",
      marginRight: "15%",
      marginTop: "5%",
      padding: "1px 1px",
      backgroundColor: "rgba(77, 168, 218, 0)",
      '& .MuiSvgIcon-root': {
        width: '2.9rem',
        height: '2.9rem',
      },
    },
    plus_icon_color: {
      color: plusIcon,
    },
    customPlusIconBoxRow: {
        display: "flex",
        justifyContent:  "flex-end",
        alignItems: "center",
        gap: 8,
        height: "40px",
        marginTop: "10px",
    },
    customBoxColumn: { 
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        gap: 8,
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        gap: 8,
    },
    detailPay: {
        width: "10px",
        margin: "0 auto",
    },
    detailPay1: {
        width: "20%",
        margin: "0 100",
        marginRight: "1",
    },
    detailPay2: {
        width: "20%",
        margin: "0 100",
        marginLeft: "1",
    },
    customBoxRowSpaces: {
        gap: 25,
        margin: "16px 0 5px 0",
    },
    menu_options : {
        position: 'absolute',
        '&  > :nth-of-type(1)': {
            width: "100%",
            height: "100%",
        },
        '& Button': {
            // color: "white",
            height: "100%",
            fontSize: '18px',
        },
    },
    menu_options_color : {
        '& Button': {
            color: tableHeaderColor,
        },
    },
    menu_options_LG : {
        top: 64,
        right: 0,
        width: "15%",
        height: "35%",
        borderRadius: "0 0 10px 10px",
    },
    menu_options_SM : {
        bottom: 0,
        width: "100%",
        borderRadius: "10px 10px 0 0",
    },
    background_color3 : {
        backgroundColor: first_color3,
    },
    modalPago : {
        borderRadius: "10px 10px 0 10px",
    },
    main_background_colorDD: {
        backgroundColor: first_color,
    },
    btnCommonStyle: {
        borderRadius: 7,
        transition: ".5s",
        color: text_color,
        "& > *": {
            transition: ".5s",
        },
        '&:hover': {
            borderWidth: "5px",
            "& > *": {
                transition: ".5s",
            }
        }
    },
    btn_cancel: {
        backgroundColor: red_hover,
        width: "70px",
        textTransform: 'none',
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: warningDark,
        }
    },
    btn_accept: {
        backgroundColor: green_hover,
        width: "70px",
        textTransform: 'none',
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: green2,
        }
    },
    btn_info: {
        backgroundColor: second_alpha_color,
        width: "70px",
        textTransform: 'none',
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: second_color,
        }
    },
    show: {
        display: "block",
    },
    showFlex: {
        display: "flex",
    },
    hide: {
        display: "none",
    },
    inputMainData: {
        backgroundColor: "white",
        borderRadius:7,
        width: "100%",
    },
    inputPago: {
        width: "20%",
    },
    inputClassName: {
        borderRadius: 7,
        // autoComplete: 'new-password',
    },
    deployModalButton: {
        color: text_color,
        width: "40px",
        height: "22px",
        top: "30px",
        left: "calc(100% - 56px)",
        backgroundColor: first_color3,
        borderRadius: "0px 0px 10px 10px",
    },

    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        color: "white",
        fontSize: "18px",
    },
    row: {
        display: "flex",
        alignItems: "center",   /* Alinea todo a la misma altura */
        gap: 10,             /* Espacio entre columnas */
    },
    label: {
        width: "140px",          /* MISMO ancho → columnas alineadas */
        textAlign: "right",     /* Alinea etiquetas a la derecha */
    },
    value: {
        minWidth: "150px",      /* Alinea inicio de los valores */
     }
})