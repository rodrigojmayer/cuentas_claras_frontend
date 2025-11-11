/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { MenuButton } from "@/components/Buttons";
import { AppBar, Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStylesGlobal } from '../Styles';
import TableProducts from '@/components/TableProducts';
import { Data, DataTable } from '@/types';

const data = [
  {_id: "test1", gestion: "ges1", nombre: "nom2", vencimiento:"venc2", pendiente:"pend2"},
  {_id: "test2", gestion: "ges2", nombre: "nom2", vencimiento:"venc2", pendiente:"pend2"}
]


export default function Home() {

  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const { classes } = useStylesGlobal()
  const [ openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);

  const [filteredData, setFilteredData] = useState<Data[]>(data)
  
  return (
    <div className={`${classes.page}`}>
      <AppBar
        className={`${classes.menu_appbar} ${classes.no_background_colorDD} ${classes.main_colorDD}`}
        sx={{ top: (breakpointLG?0:"auto"), bottom: 0 }}
      >
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
      </AppBar>
      
      <TableProducts 
            data={filteredData} 
          />
    </div>
    );
}
