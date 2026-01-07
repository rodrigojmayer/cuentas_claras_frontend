import { makeStyles } from 'tss-react/mui';
// import { createTheme } from '@mui/material/styles';

// const mainColorDD = 'rgb(18, 35, 46, 1)';
const transparent = 'rgb(255, 255, 255, 0)';

// const neutralMain = 'rgb(255, 255, 255, 1)';
const neutralMainDark = 'rgb(255, 255, 255, 1)';
const neutralMainLight = 'rgb(0, 0, 0, 1)';

const tableHeaderColorDark = 'rgb(255, 255, 255, 1)';
const tableHeaderColorLight = 'rgb(0, 0, 0, 1)';

// const first_color = '#414548';
const first_colorDark = '#414548';
const first_colorLight = '#FF0';


// const first_color2 = '#212528';

// const first_color3 = '#2A2E31';
const first_color3Dark = '#2A2E31';
const first_color3Light = '#0F0';

// const first_color4 = '#0b3555ff';
const first_color4Dark = '#0b3555ff';
const first_color4Light = '#F0F';

// const second_color = '#4938CA';
const second_colorDark = '#4938CA';
const second_colorLight = '#0FF';

// const second_alpha_color = 'rgba(73, 56, 202, 0.75)';
const second_alpha_colorDark = 'rgba(73, 56, 202, 0.75)';
const second_alpha_colorLight = 'rgba(0, 333, 333, 0.75)';

// const text_color = '#EEFBFB';
const text_colorDark = '#EEFBFB';
const text_colorLight = '#F95';

// const third_soft_color1 ='#757b86ff';
const third_soft_color1Dark ='#757b86ff';
const third_soft_color1Light ='#993';

// const third_soft_color2 =' #353B42';
const third_soft_color2Dark =' #353B42';
const third_soft_color2Light =' #090';

// const white_color = '#FFFFFF';
// const green = '#27B67D';

// const green_hover = 'rgba(39, 182, 125, 0.35)';
const green_hoverDark = 'rgba(39, 182, 125, 0.35)';
const green_hoverLight = 'rgba(1, 55, 99, 0.35)';

// const green2 = '#319F43';
const green2Dark = '#319F43';
const green2Light = '#991';
  
// const black_alpha_color = 'rgba(0, 0, 0, 0.7)';
// const red = '#F5615D';

const red_hover = 'rgba(245, 97, 93, 0.35)';
const red_hoverDark = 'rgba(245, 97, 93, 0.35)';
const red_hoverLight = 'rgba(245, 97, 93, 0.35)';

// const red2 = '#E33629';
// const blue = '#587DBD';
// const yellow = '#F8BD00';

// const linkColor = '#c1e8fb';  // Is used without a user so it should be only one
// const mainColor = 'rgb(45, 72, 91, 1)';
// const mainColorLighter = 'rgb(115, 142, 161, 1)';
// const mainColor3 = 'rgb(38,55, 66, 1)'; // is used just in the menu options with large screens
// const mainColorD = 'rgb(25, 54, 72)';

const tableAlertOnBackground = 'rgb(290, 10, 50, .6)';
const tableAlertOnBackgroundDark = 'rgb(290, 10, 50, .6)';
const tableAlertOnBackgroundLight = 'rgb(222, 110, 0, .6)';

// const tableAlertOnColor = 'rgb(255, 255, 255, 1)';
// const tableRowColor = '#222';
// const rowEvenBackground = 'rgb(69, 144, 186)';
// const rowOddBackground = 'rgb(162, 199, 220)';
const menuItem = '#DCF2F1';
const menuItemDark = '#DCF2F1';
const menuItemLight = '#FF8';

// const succesMain = 'rgb(32, 205, 60, 1)';
// const succesContrastText = 'rgb(32, 205, 60, .2)';
// const succesDark = 'rgb(2, 145, 10, 1)';
// const warningMain = 'rgb(255, 47, 47, 1)';
// const warningContrastText = 'rgb(255, 47, 47, .2)';

const warningDark = 'rgb(155, 27, 27, 1)';
const warningDarkDark = 'rgb(155, 27, 27, 1)';
const warningDarkLight = 'rgb(1, 272, 127, 1)';

// const neutralContrastText = 'rgb(255, 255, 255, .2)';
// const neutralDark = 'rgb(155, 155, 155, 1)';

const plusIcon = 'rgb(77, 168, 218, 1)';
const plusIconDark = 'rgb(77, 168, 218, 1)';
const plusIconLight = 'rgb(177, 68, 18, 1)';

export const useStylesGlobal = makeStyles()({
    
    menuIcon: {
      '& .MuiSvgIcon-root': {
        width: '64px',
        height: '44px',
      },
      display: 'flex',
      margin: "auto",
    //   marginRight: "0",
      borderRadius: "18px 18px 0px 0px",
    },
    dark_menu_icon_color: {
        color: neutralMainDark,
        backgroundColor: first_colorDark,
    },
    light_menu_icon_color: {
        color: neutralMainLight,
        backgroundColor: first_colorLight,
    },
    menu_appbar: {
        position: "fixed",
        left: 0,
        bottom: 0,
        height: '44px',
        display: "flex",
        justifyContent: "center", 
        boxShadow: 'none',
        zIndex: 40,
    },
    no_background_colorDD: {
        backgroundColor: transparent,
        boxShadow: "none",
    },
    main_colorDD: {
        color: tableHeaderColorDark,
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
        display: "flex",
        // alignContent: "center" ,
        justifyContent: "space-between"
    },
    menu_item_background_color: {
        backgroundColor: menuItem,
        '&:hover': {
            backgroundColor: menuItem,
        },
    },
    dark_main_background_colorD: {
        backgroundColor: first_color4Dark,
    },
    light_main_background_colorD: {
        backgroundColor: first_color4Light,
    },
    table_header_color: {
        color: tableHeaderColorDark,
        '&.Mui-checked': {
            color: tableHeaderColorDark,
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
        color: tableHeaderColorDark,
    },
    light_table_row_even: {
        backgroundColor: third_soft_color1Light,
    },
    dark_table_row_even: {
        backgroundColor: third_soft_color1Dark, 
    },
    light_table_row_odd: {
        backgroundColor: third_soft_color2Light, 
    },
    dark_table_row_odd: {
        backgroundColor: third_soft_color2Dark, 
    },
    table_alert_on_background : {
        backgroundColor: tableAlertOnBackground, 
    },
    // table_alert_on_color : {
    //     color: tableAlertOnColor,
    // },
    plusIcon: {
      display: "flex",
      // margin: "0 5px",
    //   marginRight: "15%",
    //   marginTop: "5%",
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
        // justifyContent:  "flex-end",
        // justifyContent:  "center",
        // alignItems: "center",
        // gap: 40,
        height: "50px",
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
        gap: 10,
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
    light_menu_options_color : {
        '& Button': {
            color: tableHeaderColorLight,
        },
    },
    dark_menu_options_color : {
        '& Button': {
            color: tableHeaderColorDark,
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
    dark_background_color3 : {
        backgroundColor: first_color3Dark,
    },
    light_background_color3 : {
        backgroundColor: first_color3Light,
    },
    modalPago : {
        borderRadius: "10px 10px 0 10px",
    },
    modalBorder : {
        borderRadius: "10px",
    },
    dark_main_background_colorDD: {
        backgroundColor: first_colorDark,
    },
    light_main_background_colorDD: {
        backgroundColor: first_colorLight,
    },
    btnCommonStyle: {
        borderRadius: 7,
        transition: ".5s",
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
    dark_btnCommonStyle_color: {
        color: text_colorDark,
    },
    light_btnCommonStyle_color: {
        color: text_colorLight,
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
        width: "70px",
        textTransform: 'none',
        fontWeight: "bold",
    },
    dark_btn_accept_color: {
        backgroundColor: green_hoverDark,
        '&:hover': {
            backgroundColor: green2Dark,
        }
    },
    light_btn_accept_color: {
        backgroundColor: green_hoverLight,
        '&:hover': {
            backgroundColor: green2Light,
        }
    },
    btn_info: {
        width: "70px",
        textTransform: 'none',
        fontWeight: "bold",
    },
    dark_btn_info_color: {
        backgroundColor: second_alpha_colorDark,
        '&:hover': {
            backgroundColor: second_colorDark,
        }
    },
    light_btn_info_color: {
        backgroundColor: second_alpha_colorLight,
        '&:hover': {
            backgroundColor: second_colorLight,
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
        width: "40px",
        height: "22px",
        top: "30px",
        left: "calc(100% - 56px)",
        borderRadius: "0px 0px 10px 10px",
    },
    dark_deployModalButton_color: {
        color: text_colorDark,
    },
    light_deployModalButton_color: {
        color: text_colorLight,
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
        justifyContent: "center"
    },
    label: {
        width: "140px",          /* MISMO ancho → columnas alineadas */
        textAlign: "right",     /* Alinea etiquetas a la derecha */
    },
    labelPerfil: {
        width: "80px",          /* MISMO ancho → columnas alineadas */
        textAlign: "right",     /* Alinea etiquetas a la derecha */
    },
    value: {
        minWidth: "170px",      /* Alinea inicio de los valores */
    },
    valuePerfil: {
        minWidth: "120px",      /* Alinea inicio de los valores */
        maxWidth: "170px",      /* Alinea inicio de los valores */
    }
})