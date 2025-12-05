/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { 
  TableContainer, 
  Table, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  Switch,
  Tooltip
} from '@mui/material';
import CustomTableHead from './wrappers/TableHeadWrapper';
import { tooltipClasses } from '@mui/material/Tooltip';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Data, DataTable, ColumnData, NewPayment } from '../types';
// import { UserContext } from '../context/UserContext'
// import { ColumnsContext } from '../context/ColumnsContext'
import { useStylesGlobal } from '../Styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';

const columnsTable = [
  {label: "Gestion", id: 0, dataKey: "gestion", width: 18, deleted: false},
  {label: "Nombre", id: 1, dataKey: "nombre", width: 20, deleted: false},
  {label: "Vencimiento", id: 2, dataKey: "vencimiento", width: 18, deleted: false},
  {label: "Pendiente",  id: 3, dataKey: "pendiente", width: 20, deleted: false},
]


const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: CustomTableHead, 
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

interface TableProductsProps {
    data: Data[];
    setVisibleManagePago: (visible: boolean) => void;
    setNewPayment: (visible: NewPayment) => void;
}

export default function TableProducts(
  { data, 
    setVisibleManagePago,
    setNewPayment,
  }:  TableProductsProps ) {
    // console.log("data: ", data);
  const  {classes} = useStylesGlobal()
  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const breakpointMD = useMediaQuery('(min-width: 724px)');  

  const [sortedData, setSortedData] = useState(data)
  useEffect(() => {
    data.sort((a:any, b:any) => {
      // console.log("a: ", a)
      // console.log("b: ", b)
      // if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
      if (a.alerta <= b.alerta) return 1;
      if (a.alerta > b.alerta) return -1;
      return 0;
    })
    setSortedData(data);
  }, [data]);

  return (
    <div>
      <Paper style={{backgroundColor: "rgb(0, 0, 0, 0)", height: `calc(100dvh - ${(breakpointLG?"105px":"120px")})`, width: (breakpointLG?"98vw":"94vw"), margin: "12px auto 0 auto" ,borderRadius: "10px"}}>
        <TableVirtuoso 
          data={data}
          components={VirtuosoTableComponents}
          style={{
            backgroundColor: "rgb(0, 0, 0, 0)", 
            borderRadius: "10px", 
            scrollbarWidth: "none", boxShadow: `-5px 5px 20px 2px black `,
            cursor: "pointer"
          }}
          fixedHeaderContent={() => {
              return (
                <TableRow>
                  {columnsTable.map((columnTable:any, index: number) => (
                    <TableCell
                      key={columnTable.id}
                      variant="head" 
                      align='center'
                      className={`${classes.main_background_colorD} ${classes.table_header_color} `}
                      onClick={() => alert(`click en header table: ${columnTable.label}`)}
                      style={{ 
                        width: columnTable.width, 
                        border:0
                      }}
                      sx={{
                        padding: "8px 0",
                      }}
                    >
                      {columnTable.label }
                    </TableCell>
                  ))}
                </TableRow>
              );
            }}
          itemContent={(index: number) =>
            rowContent(
                index, 
                sortedData[index], 
                columnsTable, 
                classes,
                setVisibleManagePago,
                setNewPayment,
            ) 
          }
        />
      </Paper>
    </div>
  );
}

function rowContent(
    _index: number, 
    row: Data, 
    columnsTable: ColumnData[], 
    classes: any,
    setVisibleManagePago: (visible: boolean) => void,
    setNewPayment: (visible: NewPayment) => void,
  ) {

  function selectDebtForPayment(debtData: Data) {
    // console.log("debtData: ", debtData)
    setNewPayment({
      id_debt: debtData._id,
      amount: null,
      pending: debtData.pendiente.split(" ")[0],
      dolar_google: debtData.dolar_google, //  ATTENTION IMPORTANT this dolar google should update to the dolar google on the current date
      name: debtData.nombre,
      email: debtData.email,
      phone: debtData.phone,
      date_debt: debtData.date_debt,
      date_due: debtData.date_due,
      initial_amount: debtData.initial_amount,
      currency: debtData.currency,
    })
    setVisibleManagePago(true)
  }
  return (
    <React.Fragment >
      {columnsTable.map((column) => (
        <TableCell
          key={column.id}
          align='center'
        //   onClick={() => alert(`click en header table: ${column.label}`)}
          className={`${ _index%2 ? classes.table_row_odd : classes.table_row_even }`}
          style={{ 
             border:0,
          }}
          sx={{
            padding: "0",
          }}
        >
          <div 
            className={ `${row?.alerta ? classes.table_alert_on_background  : "" } ${classes.table_rows}  ${classes.table_rows_color}`}
          > 
            <Tooltip 
                title={row?.[column.dataKey]} 
                disableHoverListener={String(row?.[column.dataKey])?.length <= 13}
                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                      {
                        marginTop: '0px',
                        marginLeft: '5px',
                      },
                    }
                  }
                }}
                >
                <Typography noWrap 
                sx={{
                    padding: "0 4px ",
                    // textDecoration: "",
                  }}
                    onClick={(e) => {
                          // alert(`click en row table: ${row[column.dataKey]}`)
                          selectDebtForPayment(row)
                          e.stopPropagation()
                        }}
                >
                  { ( row?.[column.dataKey] || row?.[column.dataKey] === 0 ) ? row?.[column.dataKey] : "-"}
                </Typography>
            </Tooltip> 
          </div>
        </TableCell>
      ))}
    </React.Fragment>
  );
}
