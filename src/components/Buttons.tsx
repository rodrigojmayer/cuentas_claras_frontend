/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useStylesGlobal } from '@/Styles'
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ChildProps {
    onDataChanged: (newData: boolean) => void;
}

export function MenuButton({ onDataChanged }: ChildProps) {
    const { classes } = useStylesGlobal();
    // const { user } = useContext<any>(UserContext);

    const handleClick:any = () => {
        onDataChanged(true);
    }

    return (
        <IconButton 
            onClick={handleClick}
            className={`${classes.menuIcon} ${classes.menu_icon_color}`}
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
//   const { user } = useContext<any>(UserContext)

  const handleClick = () => {
    if (clicked)
      clicked()
  }
  if (sizeIco) {
    sizeIcoExt = sizeIco
    sizeIcoInt = sizeIco
  }
  
  return(
    <IconButton
      className={`${classes.plusIcon} ${classes.plus_icon_color}`}
      id="plusButton"
      sx={{width: sizeIcoExt, height: sizeIcoExt}}
      onClick={handleClick}
      >
        <ControlPointTwoToneIcon 
        sx={{width: sizeIcoInt, height: sizeIcoInt, color: colorIco}}
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
  const handleClick = (() => {
      clicked?.()
  })
  return (
      <Button 
        type={clicked? "button" : "submit"}
        className={`${classes.btnCommonStyle} ${classes.btn_cancel}`}
        onClick={handleClick}
      >
          Cancelar
      </Button> 
  )
}
export function AcceptButton({ clicked }: ButtonProps) {
  const { classes } = useStylesGlobal();
  const handleClick = (() => {
      clicked?.()
  })
  return (
      <Button 
      type={clicked? "button" : "submit"}
        className={`${classes.btnCommonStyle} ${classes.btn_accept}`}
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
