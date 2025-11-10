/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { MenuButton } from "@/components/Buttons";
import { AppBar, Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStylesGlobal } from '../Styles';
import TableProducts from '@/components/TableProducts';
import { Data } from '@/types';

export default function Home() {

  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const { classes } = useStylesGlobal()
  const [ openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);

  const [filteredData, setFilteredData] = useState<Data[]>([])
  const [columnsUserOrder, setColumnsUserOrder] = useState<any[]>([])
  const [openUpdateAmountStock, setOpenUpdateAmountStock] = useState<any>({})
 
  
  return (
    <div className="flex items-center justify-center bg-slate-100">
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
            columns={columnsUserOrder} 
            openUpdateAmountStock={openUpdateAmountStock} 
          />
    </div>
    );
}
