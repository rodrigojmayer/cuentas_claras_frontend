/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useStylesGlobal } from '@/Styles'

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
            id="hamburgerMenuButton">
            <MenuRoundedIcon />
        </IconButton>
    )
}