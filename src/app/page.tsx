/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from 'react';
import { CloseMenuButton, MenuButton, PlusButton } from "@/components/Buttons";
import { AppBar, Box, Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStylesGlobal } from '../Styles';
import TableProducts from '@/components/TableProducts';
import { Contacts, Data, DataTable, NewPayment, UpdateDataProps, User } from '@/types';
import useUsers from "@/hooks/useUsers";
import useDebts from "@/hooks/useDebts";
import usePayments from "@/hooks/usePayments";
import useAlerts from "@/hooks/useAlerts";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";
import MenuOptions from '@/components/MenuOptions';
import ManageCargarPrestamo from '@/components/ManageCargarPrestamo';
import ManagePago from '@/components/ManagePago';
import { getUser } from '@/lib/api';

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

  const [userLogged, setUserLogged] = useState<User>({_id: "68e5b887cfb837d89f00be9f", email: "test@gmail.com", phone: "12345678", name: "test", enabled: true, deleted: false})
  const [filteredData, setFilteredData] = useState<Data[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contacts[]>([])
  const [visibleManageCargarPrestamo, setVisibleManageCargarPrestamo] = useState(false);
  
  
  const { users, isErrorUsers, isLoadingUsers } = useUsers();
  const { debts, isErrorDebts, isLoadingDebts } = useDebts();
  const { payments, isErrorPayments, isLoadingPayments } = usePayments();
  const { alerts, isErrorAlerts, isLoadingAlerts } = useAlerts();
  const { debtsByCreditor, isErrorDebtsByCreditor, isLoadingDebtsByCreditor } = useDebtsByCreditor();
  const { debtsByDebtor, isErrorDebtsByDebtor, isLoadingDebtsByDebtor } = useDebtsByDebtor();
  
  const [updateData, setUpdateData] = useState<UpdateDataProps>({state: true, data: "all"});
  
  const [visibleManagePago, setVisibleManagePago] = useState(false);
  const [newPayment, setNewPayment] = useState<NewPayment | null>(null)
  
  useEffect(() => {
    // console.log("debtsByCreditor: ", debtsByCreditor)
    if (!debtsByCreditor && !debtsByDebtor) return;

    const format = (date: string | null | undefined) => {
      if (!date) return "—";

      const d = new Date(date);
      if (isNaN(d.getTime())) return "—";

      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }).format(d);
    };

    const dataCreditor = (debtsByCreditor ?? []).map(d => ({
      _id: d._id,
      gestion: "Préstamo",
      nombre:
        typeof d?.id_user_debtor === "object"
          ? (d.id_user_debtor as any).name
          : d?.id_user_debtor,
      vencimiento: format(d.date_due),
      pendiente: `${d.amount} ${d.currency}`,
      dolar_google: d.dolar_google,
      alerta: d.alert_enabled && d.alerted,
      id_user: typeof d?.id_user_debtor === "object" && (d.id_user_debtor as any)._id,
      email: typeof d?.id_user_debtor === "object" && (d.id_user_debtor as any).email,
      phone: typeof d?.id_user_debtor === "object" && (d.id_user_debtor as any).phone,
    }));

    const dataDebtor = (debtsByDebtor ?? []).map(d => ({
      _id: d._id,
      gestion: "Deuda",
      nombre:
        typeof d?.id_user_creditor === "object"
          ? (d.id_user_creditor as any).name
          : d?.id_user_creditor,
      vencimiento: format(d.date_due),
      pendiente: `${d.amount} ${d.currency}`,
      dolar_google: d.dolar_google,
      alerta: d.alert_enabled && d.alerted,
      id_user: typeof d?.id_user_creditor === "object" && (d.id_user_creditor as any)._id,
      email: typeof d?.id_user_creditor === "object" && (d.id_user_creditor as any).email,
      phone: typeof d?.id_user_creditor === "object" && (d.id_user_creditor as any).phone,
    }));

    // unir y eliminar duplicados
    const map = new Map();
    [...dataCreditor, ...dataDebtor].forEach(item => {
      map.set(item._id, item);
    });

    setFilteredData(Array.from(map.values()));
  }, [debtsByCreditor, debtsByDebtor]);

  useEffect(() => {
    if(visibleManagePago && newPayment?.id_debt){
      const debt = debts?.find(d => d._id === newPayment.id_debt )
      console.error("debt: ", debt)
      // getUser("123")

      // setNewPayment({...newPayment, nameUser: .})
    }
  }, [visibleManagePago])
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
              {/* <div className={`${classes[(openMenu ? "hide" : "show")]}`}> */}
                <MenuButton
                  onDataChanged={handleOpenMenu}
                />
              {/* </div> */}
              {/* <div className={`${classes[(openMenu ? "show" : "hide")]}`}>
                <CloseMenuButton
                  clicked={() => handleOpenMenu()}
                />
              </div> */}
            </Grid>
            <Grid size="grow">
            </Grid>
          </Grid>
      </AppBar>
      
      <TableProducts 
        data={filteredData} 
        setVisibleManagePago={setVisibleManagePago}
        setNewPayment= {setNewPayment}
      />
        <Box className={` ${classes.customPlusIconBoxRow}`}>
          <PlusButton
            sizeIco={"55px !important"}
            // clicked={addInputCustomField}
            clicked={() => setVisibleManageCargarPrestamo(true)}
          />
        </Box>
        <MenuOptions
            open={openMenu} 
            handleClose={handleCloseMenu} 
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
                    className={`${classes.background_color3} p6 rounded-2xl shadow-lg w-[90%] max-w-md text-white`}
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ManagePago
                      setUpdateData={setUpdateData}
                      newPayment={newPayment}
                      setVisibleManagePago={setVisibleManagePago}
                      // filteredContacts={filteredContacts}
                    />
                </div>
            </div>
        )}

    </div>
    );
}
