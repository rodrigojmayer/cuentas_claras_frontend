/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { MenuButton, PlusButton } from "@/components/Buttons";
import { AppBar, Box, Grid, IconButton, Menu, MenuItem, Switch, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStylesGlobal } from '../Styles';
import TableProducts from '@/components/TableProducts';
import { Contacts, NewPayment, UpdateDataProps } from '@/types';
// import useUsers from "@/hooks/useUsers";
// import useDebts from "@/hooks/useDebts";
// import usePayments from "@/hooks/usePayments";
// import useAlerts from "@/hooks/useAlerts";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";
import MenuOptions from '@/components/MenuOptions';
import ManageCargarPrestamo from '@/components/ManageCargarPrestamo';
import ManagePago from '@/components/ManagePago';
import { getPaymentsByDebt } from '@/lib/api';
// import { useSession } from 'next-auth/react';
import ModalHistorial from '@/components/ModalHistorial';
import ModalCambiarFecha from '@/components/ModalCambiarFecha';
import { dateFormat } from '@/utils/dateFormat';
// import LockIcon from '@mui/icons-material/Lock';
import FilterListIcon from '@mui/icons-material/FilterList'
import ManagePerfil from '@/components/ManagePerfil';

// const dataC = [
//   {_id: "test1", gestion: "ges1", nombre: "nom1", vencimiento:"venc1", pendiente:"pend1"},
//   {_id: "test2", gestion: "ges2", nombre: "nom2", vencimiento:"venc2", pendiente:"pend2"}
// ]


export default function Home() {

  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const { classes } = useStylesGlobal()
  const [ openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);
  // const handleOpenOptions = (newData:  {option: string, open: boolean}) => {
  //         setOpenOptions({...openOptions, [newData.option]: newData.open});
  // }

  // const { data: session } = useSession()
  // const [userLogged, setUserLogged] = useState<User>({_id: "68e5b887cfb837d89f00be9f", email: "test@gmail.com", phone: "12345678", name: "test", enabled: true, deleted: false})
  // const [filteredData, setFilteredData] = useState<Data[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contacts[]>([])
  const [visibleManageCargarPrestamo, setVisibleManageCargarPrestamo] = useState(false);
  
  const [visibleManagePerfil, setVisibleManagePerfil] = useState(false);
  
  // const { users, isErrorUsers, isLoadingUsers } = useUsers();
  // const { debts, isErrorDebts, isLoadingDebts } = useDebts();
  // const { payments, isErrorPayments, isLoadingPayments } = usePayments();
  // const { alerts, isErrorAlerts, isLoadingAlerts } = useAlerts();
  const { debtsByCreditor, isErrorDebtsByCreditor, isLoadingDebtsByCreditor } = useDebtsByCreditor();
  const { debtsByDebtor, isErrorDebtsByDebtor, isLoadingDebtsByDebtor } = useDebtsByDebtor();
  
  const [updateData, setUpdateData] = useState<UpdateDataProps>({state: true, data: "all"});
  
  const [visibleManagePago, setVisibleManagePago] = useState(false);
  const [newPayment, setNewPayment] = useState<NewPayment | null>(null)
  
  const [visibleModalHistorial, setVisibleModalHistorial] = useState(false);
  const [historialDebtPayments, setHistorialDebtPayments] = useState();
  const [visibleModalCambiarFecha, setVisibleModalCambiarFecha] = useState(false);
  // const [dataCambiarFecha, setDataCambiarFecha] = useState();

  const [showAlertsFirst, setShowAlertsFirst] = useState(false);
  const [showFinishedDebts, setShowFinishedDebts] = useState(false);
  // const [option3, setoption3] = useState();
  // const [handleClose, setHandleClose] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openTableOptions = (event: React.MouseEvent<HTMLElement>) => {
    console.log("openTableOptions pressed")
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
    // setCheckListStock([])
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleClose = () => {
    // Delay resetting anchorEl until after the menu has closed
    // setTimeout(() => {
      // if(anchorEl)
        setAnchorEl(null);
    // }, 100); // Adjust the delay as needed
};

const filteredData = React.useMemo(() => {
  if (!debtsByCreditor && !debtsByDebtor) return [];

  const dataCreditor = (debtsByCreditor ?? [])
    .filter(d => showFinishedDebts || (d.amount && d.amount > 0))
    .map(d => ({
      _id: d._id,
      gestion: "Préstamo",
      nombre:
        typeof d?.id_user_debtor === "object"
          ? (d.id_user_debtor as any).name
          : d?.id_user_debtor,
      vencimiento: dateFormat(d.date_due),
      pendiente: `${d.amount} ${d.currency}`,
      dolar_google: d.dolar_google,
      alerta: d.alert_enabled && d.alerted,
      id_user:
        typeof d?.id_user_debtor === "object"
          ? (d.id_user_debtor as any)._id
          : d?.id_user_debtor,
      email:
        typeof d?.id_user_debtor === "object"
          ? (d.id_user_debtor as any).email
          : d?.id_user_debtor,
      phone:
        typeof d?.id_user_debtor === "object"
          ? (d.id_user_debtor as any).phone
          : d?.id_user_debtor,
      date_debt: dateFormat(d.date_debt),
      date_due: dateFormat(d.date_due),
      initial_amount: d.initial_amount,
      currency: d.currency,
    }));

  const dataDebtor = (debtsByDebtor ?? [])
    .filter(d => showFinishedDebts || (d.amount && d.amount > 0))
    .map(d => ({
      _id: d._id,
      gestion: "Deuda",
      nombre:
        typeof d?.id_user_creditor === "object"
          ? (d.id_user_creditor as any).name
          : d?.id_user_creditor,
      vencimiento: dateFormat(d.date_due),
      pendiente: `${d.amount} ${d.currency}`,
      dolar_google: d.dolar_google,
      alerta: d.alert_enabled && d.alerted,
      id_user:
        typeof d?.id_user_creditor === "object"
          ? (d.id_user_creditor as any)._id
          : d?.id_user_creditor,
      email:
        typeof d?.id_user_creditor === "object"
          ? (d.id_user_creditor as any).email
          :d?.id_user_creditor,
      phone:
        typeof d?.id_user_creditor === "object"
          ? (d.id_user_creditor as any).phone
          : d?.id_user_creditor,
      date_debt: dateFormat(d.date_debt),
      date_due: dateFormat(d.date_due),
      initial_amount: d.initial_amount,
      currency: d.currency,
    }));

  // merge & remove duplicates
  const map = new Map();
  [...dataCreditor, ...dataDebtor].forEach(item => {
    map.set(item._id, item);
  });

  return Array.from(map.values());
}, [debtsByCreditor, debtsByDebtor, showFinishedDebts]);


  // useEffect(() => {
  //   // console.log("debtsByCreditor: ", debtsByCreditor)
  //   // console.log("debtsByDebtor: ", debtsByDebtor)
  //   if (!debtsByCreditor && !debtsByDebtor) return;


  //   const dataCreditor = (debtsByCreditor ?? [])
  //    .filter(d => showFinishedDebts || (d.amount && d.amount > 0))
  //   .map(d => ({
  //     _id: d._id,
  //     gestion: "Préstamo",
  //     nombre:
  //       typeof d?.id_user_debtor === "object"
  //         ? (d.id_user_debtor as any).name
  //         : d?.id_user_debtor,
  //     vencimiento: dateFormat(d.date_due),
  //     pendiente: `${d.amount} ${d.currency}`,
  //     dolar_google: d.dolar_google,
  //     alerta: d.alert_enabled && d.alerted,
  //     id_user: typeof d?.id_user_debtor === "object" && (d.id_user_debtor as any)._id,
  //     email: typeof d?.id_user_debtor === "object" && (d.id_user_debtor as any).email,
  //     phone: typeof d?.id_user_debtor === "object" && (d.id_user_debtor as any).phone,
  //     date_debt: dateFormat(d.date_debt),
  //     date_due: dateFormat(d.date_due),
  //     initial_amount: d.initial_amount,
  //     currency: d?.currency,
  //   }));

  //   const dataDebtor = (debtsByDebtor ?? [])
  //   .filter(d => showFinishedDebts || (d.amount && d.amount > 0))
  //   .map(d => ({
  //     _id: d._id,
  //     gestion: "Deuda",
  //     nombre:
  //       typeof d?.id_user_creditor === "object"
  //         ? (d.id_user_creditor as any).name
  //         : d?.id_user_creditor,
  //     vencimiento: dateFormat(d.date_due),
  //     pendiente: `${d.amount} ${d.currency}`,
  //     dolar_google: d.dolar_google,
  //     alerta: d.alert_enabled && d.alerted,
  //     id_user: typeof d?.id_user_creditor === "object" && (d.id_user_creditor as any)._id,
  //     email: typeof d?.id_user_creditor === "object" && (d.id_user_creditor as any).email,
  //     phone: typeof d?.id_user_creditor === "object" && (d.id_user_creditor as any).phone,
  //     date_debt: dateFormat(d.date_debt),
  //     date_due: dateFormat(d.date_due),
  //     initial_amount: d.initial_amount,
  //     currency: d?.currency,
  //   }));
  //   console.log("dataDebtor: ", dataDebtor)
  //   // unir y eliminar duplicados
  //   const map = new Map();
  //   [...dataCreditor, ...dataDebtor].forEach(item => {
  //     map.set(item._id, item);
  //   });

  //   setFilteredData(Array.from(map.values()));
  // }, [debtsByCreditor, debtsByDebtor, showFinishedDebts]);

  // useEffect(() => {
  //   if(visibleManagePago && newPayment?.id_debt){
  //     const debt = debts?.find(d => d._id === newPayment.id_debt )
  //     console.log("debt: ", debt)
  //     let paymentUser
      
  //      if(typeof debt?.id_user_debtor === "object" && typeof debt?.id_user_debtor === "object"){
  //        paymentUser = debt?.id_user_creditor === session?.user._id ? debt?.id_user_debtor : debt?.id_user_creditor;
  //        console.log("paymentUser: ", paymentUser)
         
  //        setNewPayment({...newPayment, nameUser: paymentUser.name})
  //       }
  //   }
  // }, [visibleManagePago])
  // useEffect(() => {
  //   // if(newPayment)
  //   console.log("updateData: ", updateData)
  //     mutateDebtsByCreditor();
  // }, [updateData])
  useEffect(() => {
    const contacts = filteredData.map(f => ({
      id_user: f.id_user,
      email: f.email,
      phone: f.phone,
    }))
    const uniqueContacts = Array.from(
      new Map(contacts.map(item => [item.email, item])).values()
    );
    setFilteredContacts(uniqueContacts)
    // console.log("contacts: ", contacts)
    // console.log("uniqueContacts: ", uniqueContacts)
  
  }, [filteredData]);
  useEffect(() => {
     if (!visibleModalHistorial || !newPayment?.id_debt) return;

    const fetchPayments = async () => {
    try {
      const payments = await getPaymentsByDebt(newPayment.id_debt);
      const paymentsDateFormat = payments.map((p: any) => ({
        ...p,
        date_payment: dateFormat(p.date_payment),
      }))
      setHistorialDebtPayments(paymentsDateFormat);
    } catch (err: any) {
      console.error("Error fetching payments: ", err);
    }
  };

  fetchPayments();
  }, [visibleModalHistorial, newPayment])
  
  
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
        setVisibleManagePago={setVisibleManagePago}
        setNewPayment= {setNewPayment}
        showAlertsFirst={showAlertsFirst}
      />

      <>
        <Menu
          disableScrollLock={true}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          style={{ 
            marginTop: '-25px', 
            marginLeft: '25px',
          }}

          MenuListProps={{
              sx: { padding: 0,  
              },
          }}
        >
          <MenuItem 
            onClick={(e) => 
              {setShowAlertsFirst(!showAlertsFirst)
              e.stopPropagation()
            }}
            className={`${classes.menu_item} ${classes.menu_item_background_color}`} 
          >
            <Typography 
              // variant="body2" 
            > 
              Alertas primero
              </Typography>
              <Switch 
                size='small'
                color='success'  
                checked={showAlertsFirst}
              />
          </MenuItem>
          <MenuItem 
            onClick={(e) => 
              {setShowFinishedDebts(!showFinishedDebts)
              e.stopPropagation()
            }}
            className={`${classes.menu_item} ${classes.menu_item_background_color}`} 
          >
            <Typography 
              // variant="body2" 
            > 
                Ver finalizados
            </Typography>
            <Switch 
              size='small'
              color='success'  
              checked={showFinishedDebts}
            />  
          </MenuItem>
        </Menu>
      </>
      <Box className={` ${classes.customPlusIconBoxRow}`}>
        <IconButton
          onClick={ openTableOptions }
          className={`${classes.plusIcon} ${classes.plus_icon_color}`}
          sx={{ margin: "0 auto" }}
        >
          <FilterListIcon />
        </IconButton>
        <PlusButton
          clicked={() => setVisibleManageCargarPrestamo(true)}
        />
      </Box>
      <MenuOptions
          open={openMenu} 
          handleClose={handleCloseMenu}
          setVisibleManagePerfil={setVisibleManagePerfil} 
        //  onData = {handleOpenOptions}
      /> 
      {visibleManageCargarPrestamo && (
          <div 
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              onClick={() => setVisibleManageCargarPrestamo(false)} // click background to close
          >
              {/* --- MODAL CONTENT --- */}
              <div
                  className={`${classes.background_color3} p6 rounded-2xl shadow-lg w-[90%] max-w-md text-white`}
                  onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
              >
                  <ManageCargarPrestamo
                    setUpdateData={setUpdateData}
                    // userEdit={userEdit}
                    setVisibleManageCargarPrestamo={setVisibleManageCargarPrestamo}
                    filteredContacts={filteredContacts}
                  />
              </div>
          </div>
        )}
        {visibleManagePago && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleManagePago(false)} // click background to close
            >
                {/* --- MODAL CONTENT --- */}
                <div
                    className={`${classes.background_color3} ${classes.modalPago} p6 shadow-lg w-[90%] max-w-md text-white`}
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ManagePago
                      setUpdateData={setUpdateData}
                      newPayment={newPayment}
                      setVisibleManagePago={setVisibleManagePago}
                      setVisibleModalHistorial={setVisibleModalHistorial}
                      setVisibleModalCambiarFecha={setVisibleModalCambiarFecha}
                      // filteredContacts={filteredContacts}
                    />
                </div>
            </div>
        )}

        {visibleModalHistorial && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleModalHistorial(false)} // click background to close
            >
                {/* --- MODAL CONTENT --- */}
                <div
                    className={`${classes.background_color3} ${classes.modalBorder} p6 shadow-lg w-[85%] max-w-md text-white`}
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ModalHistorial
                      debtSelected={newPayment}
                      historialDebtPayments={historialDebtPayments}
                    />
                </div>
            </div>
        )}

        {visibleModalCambiarFecha && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleModalCambiarFecha(false)} // click background to close
            >
                {/* --- MODAL CONTENT --- */}
                <div
                    className={`${classes.background_color3} ${classes.modalBorder} p6 shadow-lg w-[85%] max-w-md text-white`}
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                  <ModalCambiarFecha
                    // setUpdateData={setUpdateData}
                    debtSelected={newPayment}
                    setVisibleModalCambiarFecha={setVisibleModalCambiarFecha}
                    // historialDebtPayments={historialDebtPayments}
                    // filteredContacts={filteredContacts}
                    setNewPayment={setNewPayment}
                  />
                </div>
            </div>
        )}
        {visibleManagePerfil && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleManagePerfil(false)} // click background to close
            >
                {/* --- MODAL CONTENT --- */}
                <div
                    className={`${classes.background_color3} ${classes.modalBorder} p6 shadow-lg w-[85%] max-w-md text-white`}
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                  <ManagePerfil
                      setUpdateData={setUpdateData}
                      newPayment={newPayment}
                      setVisibleManagePerfil={setVisibleManagePerfil}
                      // setVisibleModalHistorial={setVisibleModalHistorial}
                      setVisibleModalCambiarFecha={setVisibleModalCambiarFecha}
                  />
                </div>
            </div>
        )}

    </div>
    );
}
