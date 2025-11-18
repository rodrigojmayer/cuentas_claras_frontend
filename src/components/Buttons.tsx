/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useStylesGlobal } from '@/Styles'
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';

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
