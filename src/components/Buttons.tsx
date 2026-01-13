/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useStylesGlobal } from '@/Styles';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterListIcon from '@mui/icons-material/FilterList'
import { useTheme } from "next-themes";

interface ChildProps {
    onDataChanged: (newData: boolean) => void;
}

export function MenuButton({ onDataChanged }: ChildProps) {
    const { classes } = useStylesGlobal();
    const { theme } = useTheme();
    // const { user } = useContext<any>(UserContext);

    const handleClick:any = () => {
        onDataChanged(true);
    }

    return (
        <IconButton 
            onClick={handleClick}
            className={`
              // ${classes[`${theme}_menu_icon_color` as keyof typeof classes]}
              ${classes[`${theme}_menuIcon` as keyof typeof classes]} 
            `}
            id="hamburgerMenuButton"
        >
            <MenuRoundedIcon />
        </IconButton>
    )
}


interface PlusButtonProps {
  sizeIco?: string
  sizeIcoExt?: string
  sizeIcoInt?: string
  colorIco?: string
  clicked?: () => void
}

export function PlusButton({ sizeIco, sizeIcoExt, sizeIcoInt, colorIco, clicked }:  PlusButtonProps ) {

  const { classes } = useStylesGlobal();
  const { theme } = useTheme();
//   const { user } = useContext<any>(UserContext)
  let heightIcoExt, widthIcoExt, heightIcoInt, widthIcoInt = sizeIco
  const handleClick = () => {
    if (clicked)
      clicked()
  }
  if (sizeIco) {
    heightIcoExt = sizeIco
    widthIcoExt = sizeIco
    heightIcoInt = sizeIco
    widthIcoInt = sizeIco
  } else {
    // heightIcoExt = "55px"
    // widthIcoExt = "55px"
    // heightIcoInt = "40px !important"
    // widthIcoInt = "55px !important"

  }
  
  return(
    <IconButton
      className={`
        ${classes.plusIcon} 
        ${classes[`${theme}_plus_icon_color` as keyof typeof classes]}
      `}
      id="plusButton"
      sx={{
        // width: widthIcoExt, 
        // height: heightIcoExt, 
        margin: "0 auto"
      }}
      onClick={handleClick}
      >
        <ControlPointTwoToneIcon 
        sx={{width: widthIcoInt, height: heightIcoInt, color: colorIco}}
        />
    </IconButton>
  )
}

export function FilterButton( {sizeIco, sizeIcoExt, sizeIcoInt, colorIco, clicked }:  PlusButtonProps) {
  const { classes } = useStylesGlobal();
  const { theme } = useTheme();
  let heightIcoExt, widthIcoExt, heightIcoInt, widthIcoInt = sizeIco
  const handleClick = () => {
    if (clicked)
      clicked()
  }
  if (sizeIco) {
    heightIcoExt = sizeIco
    widthIcoExt = sizeIco
    heightIcoInt = sizeIco
    widthIcoInt = sizeIco
  } else {
    // heightIcoExt = "55px"
    // widthIcoExt = "55px"
    // heightIcoInt = "55px !important"
    // widthIcoInt = "100% !important"

  }
return(
    <IconButton
      className={`
        ${classes.plusIcon} 
        ${classes[`${theme}_plus_icon_color` as keyof typeof classes]}
      `}
      // id="plusButton"
      sx={{
        // width: widthIcoExt, 
        // height: heightIcoExt, 
        margin: "0 auto"
      }}
      onClick={handleClick}
      >
        <FilterListIcon 
        // sx={{color: "white", width: "50%", height: "55px", margin: "auto"}}
        sx={{
          // width: widthIcoInt, 
          // height: heightIcoInt, 
          color: colorIco, 
          // margin: "0 auto"
        }}
        />
    </IconButton>
  )   
}

interface ButtonProps {
  sizeIco?: string
  roundedIco?: boolean
  cusField?: {id: number, value: string}
  clicked?: (id?: number, value?: string) => void
  direction?: string
  submitOk?: boolean
  disabled?: boolean
  widthIco?: number
}

export function CancelButton({ clicked }: ButtonProps) {
  const { classes } = useStylesGlobal();
  const { theme } = useTheme();
  const handleClick = (() => {
      clicked?.()
  })
  return (
      <Button 
        type={clicked? "button" : "submit"}
        className={`
          ${classes.btnCommonStyle} 
          ${classes[`${theme}_btnCommonStyle_color` as keyof typeof classes]} 
          ${classes.btn_cancel}
          ${classes[`${theme}_btn_cancel_color` as keyof typeof classes]} 
        `}
        onClick={handleClick}
      >
          Cancelar
      </Button> 
  )
}
export function AcceptButton({ clicked }: ButtonProps) {
  const { classes } = useStylesGlobal();
  const { theme } = useTheme();
  const handleClick = (() => {
      clicked?.()
  })
  return (
      <Button 
      type={clicked? "button" : "submit"}
        className={`
          ${classes[`${theme}_btnCommonStyle_color` as keyof typeof classes]} 
          ${classes[`${theme}_btn_accept_color` as keyof typeof classes]}
          ${classes.btnCommonStyle} 
          ${classes.btn_accept} 
        `}
        onClick={handleClick}
      >
          Aceptar
      </Button> 
  )
}

export function CloseMenuButton({ sizeIco, roundedIco, clicked }: ButtonProps) {

  const handleClick = (() => {
      clicked?.()
  })
  
  return (
    <Button 
        type={clicked? "button" : "submit"}
        variant="text"
        color="inherit"
        onClick={handleClick}
    >
        <CloseRoundedIcon 
            sx={{ 
                fontSize: 40, 
            }}>
        </CloseRoundedIcon>
    </Button>
  )
}
