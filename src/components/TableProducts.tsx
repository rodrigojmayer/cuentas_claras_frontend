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
  Tooltip
} from '@mui/material';
import CustomTableHead from './wrappers/TableHeadWrapper';
import { tooltipClasses } from '@mui/material/Tooltip';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Data, ColumnData, NewPayment } from '../types';
import { useStylesGlobal } from '../Styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from "next-themes";

const columnsTable = [
  {label: "Gestion", id: 0, dataKey: "gestion", width: 17, deleted: false},
  {label: "Nombre", id: 1, dataKey: "nombre", width: 18, deleted: false},
  {label: "Vencimiento", id: 2, dataKey: "vencimiento", width: 23, deleted: false},
  {label: "Pendiente",  id: 3, dataKey: "pendiente", width: 18, deleted: false},
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
    showAlertsFirst: boolean;
}

export default function TableProducts(
  { data, 
    setVisibleManagePago,
    setNewPayment,
    showAlertsFirst,
  }:  TableProductsProps ) {
    // console.log("data: ", data);
  const  {classes} = useStylesGlobal()
  const { theme } = useTheme();
  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const breakpointMD = useMediaQuery('(min-width: 724px)');  
   
  const [rowsUserSort, setRowsUserSort] = useState({
    field: "date_debt",
    asc: true
  })

  const sortedData = React.useMemo(() => {
    const copy = [...data];

    if (rowsUserSort.field) {
      const { field, asc } = rowsUserSort;
      copy.sort((a, b) => {
        const x = a[field];
        const y = b[field];
        if (x == null || y == null) return 0;
        if (x < y) return asc ? -1 : 1;
        if (x > y) return asc ? 1 : -1;
        return 0;
      });
    }
    if (showAlertsFirst) {
      copy.sort((a, b) => Number(b.alerta) - Number(a.alerta));
    }

    return copy; // ALWAYS an array
    // return copy.sort((a, b) => b.amount - a.amount);
  }, [data, showAlertsFirst, rowsUserSort]);

  return (
    <div>
      {/* <Paper style={{backgroundColor: "rgb(0, 0, 0, .20)", height: `calc(100dvh - ${(breakpointLG?"105px":"120px")})`, width: (breakpointLG?"98vw":"94vw"), margin: "12px auto 0 auto" ,borderRadius: "10px"}}> */}
      <Paper className={`
          ${classes.table}
          ${breakpointMD ? classes.tableMD : classes.tableSM}
        `}
      >
        <TableVirtuoso 
          // data={data}
          data={sortedData}
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
                      className={`
                        ${classes[`${theme}_main_background_colorD` as keyof typeof classes]} 
                        ${classes[`${theme}_table_header_color` as keyof typeof classes]} 
                      `}
                      onClick={(e) => {
                        e.stopPropagation()
                        const field = columnTable.dataKey;
                        setRowsUserSort(prev =>
                          prev.field === field
                            ? { field, asc: !prev.asc }
                            : { field, asc: true }
                        );
                      }
                    }
                      style={{ 
                        width: columnTable.width, 
                        border:0
                      }}
                      sx={{
                        padding: "8px 0",
                      }}
                    >
                      {columnTable.label }
                      
                      { rowsUserSort.field === columnTable.dataKey ?
                          rowsUserSort.asc ? <KeyboardArrowDownIcon fontSize="small"/>
                            : <KeyboardArrowUpIcon fontSize="small"/>
                            : ""
                      }
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
                theme
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
    theme: any
  ) {

  function selectDebtForPayment(debtData: Data) {
    // console.log("debtData: ", debtData)
    setNewPayment({
      id_debt: debtData._id,
      amount: null,
      pending: Number(debtData.pendiente.split(" ")[0]),
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
          className={`${ _index%2 ? 
            classes[`${theme}_table_row_odd` as keyof typeof classes] 
          : 
            classes[`${theme}_table_row_even` as keyof typeof classes]}
          `}
          style={{ 
             border:0,
          }}
          sx={{
            padding: "0",
          }}
        >
          <div 
            className={ `
              ${row?.alerta ? 
                classes[`${theme}_table_alert_on_background` as keyof typeof classes]                
              : 
                "" } 
              ${classes.table_rows}  
              ${classes[`${theme}_table_rows_color` as keyof typeof classes]}`}
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
