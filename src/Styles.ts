import { makeStyles } from 'tss-react/mui';
import { createTheme } from '@mui/material/styles';

const _0mainColorDD = 'rgb(18, 35, 46, 1)';
const _0neutralMain = 'rgb(255, 255, 255, 1)';

export const useStylesGlobal = makeStyles()({
    
    menuIcon: {
      color: _0neutralMain,
      '& .MuiSvgIcon-root': {
        width: '2.9rem',
        height: '2.9rem',
      },
      display: 'flex',
      margin: "auto",
      marginRight: "0",
    },
    menu_icon_color: {
        backgroundColor: _0mainColorDD,
    },
})