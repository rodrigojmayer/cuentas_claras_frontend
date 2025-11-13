/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from 'react';
import { MenuButton } from "@/components/Buttons";
import { AppBar, Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStylesGlobal } from '../Styles';
import TableProducts from '@/components/TableProducts';
import { Data, DataTable, User } from '@/types';
import useUsers from "@/hooks/useUsers";
import useDebts from "@/hooks/useDebts";
import usePayments from "@/hooks/usePayments";
import useAlerts from "@/hooks/useAlerts";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";

// const dataC = [
//   {_id: "test1", gestion: "ges1", nombre: "nom1", vencimiento:"venc1", pendiente:"pend1"},
//   {_id: "test2", gestion: "ges2", nombre: "nom2", vencimiento:"venc2", pendiente:"pend2"}
// ]


export default function Home() {

  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const { classes } = useStylesGlobal()
  const [ openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);

  const [userLogged, setUserLogged] = useState<User>({_id: "68e5b887cfb837d89f00be9f", email: "test@gmail.com", phone: "12345678", name: "test", enabled: true, deleted: false})
  const [filteredData, setFilteredData] = useState<Data[]>([])
  
  const { users, isErrorUsers, isLoadingUsers } = useUsers();
  const { debts, isErrorDebts, isLoadingDebts } = useDebts();
  const { payments, isErrorPayments, isLoadingPayments } = usePayments();
  const { alerts, isErrorAlerts, isLoadingAlerts } = useAlerts();
  const { debtsByCreditor, isErrorDebtsByCreditor, isLoadingDebtsByCreditor } = useDebtsByCreditor();
  const { debtsByDebtor, isErrorDebtsByDebtor, isLoadingDebtsByDebtor } = useDebtsByDebtor();

  console.log("debtsByCreditor: ", debtsByCreditor)
  console.log("debtsByDebtor: ", debtsByDebtor)
  useEffect(() => {
       if (!debtsByCreditor || debtsByCreditor.length === 0) return;
       
       const fData = debtsByCreditor.map(d => {
    return {
      _id: d._id,
      gestion: "Préstamo", 
      nombre: d.id_user_debtor?.name ?? "",
      vencimiento:"venc", 
      pendiente: `${d.amount} USD`
    }
  })
  setFilteredData([ ...filteredData, ...fData])
    
  }, [debtsByCreditor])
  
  useEffect(() => {
       if (!debtsByDebtor || debtsByDebtor.length === 0) return;
       
       const fData2 = debtsByDebtor.map(d => {
    return {
      _id: d._id,
      gestion: "Deuda", 
      nombre: d.id_user_creditor?.name ?? "",
      vencimiento:"venc", 
      pendiente: `${d.amount} USD`
    }
  })
  setFilteredData([ ...filteredData, ...fData2])
    
  }, [debtsByDebtor])

  //   useEffect(() => {
  //    console.log("filteredData: ", filteredData)
     
  // }, [filteredData])

  if (isLoadingUsers) return <p>Cargando usuarios...</p>;
  if (isErrorUsers) return <p>Error al cargar usuarios</p>;
  if (isLoadingDebts) return <p>Cargando deudas...</p>;
  if (isErrorDebts) return <p>Error al cargar deudas</p>;
  if (isLoadingPayments) return <p>Cargando pagos</p>;
  if (isErrorPayments) return <p>Error al cargar pagos</p>;  
  if (isLoadingAlerts) return <p>Cargando alertas</p>;
  if (isErrorAlerts) return <p>Error al cargar alertas</p>;
  if (isLoadingDebtsByCreditor) return <p>Cargando deudas por acreedor</p>;
  if (isErrorDebtsByCreditor) return <p>Error al cargar deudas por acreedor</p>;
  if (isLoadingDebtsByDebtor) return <p>Cargando deudas por deudor</p>;
  if (isErrorDebtsByDebtor) return <p>Error al cargar deudas por deudor</p>;
  // console.log("users: ", users);
  // console.log("debts: ", debts);
  // console.log("payments: ", payments);
  // console.log("alerts: ", alerts);
  // console.log("debtsByCreditor: ", debtsByCreditor);

  

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
