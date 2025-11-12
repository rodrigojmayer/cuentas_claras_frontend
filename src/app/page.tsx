/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { MenuButton } from "@/components/Buttons";
import { AppBar, Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStylesGlobal } from '../Styles';
import TableProducts from '@/components/TableProducts';
import { Data, DataTable } from '@/types';
import useUsers from "@/hooks/useUsers";
import useDebts from "@/hooks/useDebts";
import usePayments from "@/hooks/usePayments";
import useAlerts from "@/hooks/useAlerts";

const dataC = [
  {_id: "test1", gestion: "ges1", nombre: "nom2", vencimiento:"venc2", pendiente:"pend2"},
  {_id: "test2", gestion: "ges2", nombre: "nom2", vencimiento:"venc2", pendiente:"pend2"}
]


export default function Home() {

  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const { classes } = useStylesGlobal()
  const [ openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);

  const [filteredData, setFilteredData] = useState<Data[]>(dataC)
  
  const { users, isErrorUsers, isLoadingUsers } = useUsers();
  const { debts, isErrorDebts, isLoadingDebts } = useDebts();
  const { payments, isErrorPayments, isLoadingPayments } = usePayments();
  const { alerts, isErrorAlerts, isLoadingAlerts } = useAlerts();
  if (isLoadingUsers) return <p>Cargando usuarios...</p>;
  if (isErrorUsers) return <p>Error al cargar usuarios</p>;
  if (isLoadingDebts) return <p>Cargando deudas...</p>;
  if (isErrorDebts) return <p>Error al cargar deudas</p>;
  if (isLoadingPayments) return <p>Cargando pagos</p>;
  if (isErrorPayments) return <p>Error al cargar pagos</p>;  
  if (isLoadingAlerts) return <p>Cargando alertas</p>;
  if (isErrorAlerts) return <p>Error al cargar alertas</p>;
  // console.log("users: ", users);
  // console.log("debts: ", debts);
  // console.log("payments: ", payments);
  // console.log("alerts: ", alerts);

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
