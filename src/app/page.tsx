"use client";
import { useState } from 'react';
import { MenuButton } from "@/components/Buttons";
import { AppBar, Grid, Toolbar } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStylesGlobal } from '../Styles';

export default function Home() {

  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const { classes } = useStylesGlobal()
  const [ openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);

  return (
    <div className="flex items-center justify-center bg-slate-100">
      
      {/* < DebtsList /> */}
      <AppBar
        className={`${classes.menu_appbar} ${classes.no_background_colorDD} ${classes.main_colorDD}`}
        sx={{ top: (breakpointLG?0:"auto"), bottom: 0,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
   }}
      >
        {/* <Toolbar > */}
          <Grid container spacing={3}>
            <Grid size="grow">
            </Grid>
            <Grid  size={3}>
              <MenuButton
                onDataChanged={handleOpenMenu}
              />
            </Grid>
            <Grid size="grow">
            </Grid>
          </Grid>
        {/* </Toolbar> */}
      </AppBar>
    </div>
    );
}
