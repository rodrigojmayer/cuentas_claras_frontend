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
import { Data, DataTable, ColumnData } from '../types';
// import { UserContext } from '../context/UserContext'
// import { ColumnsContext } from '../context/ColumnsContext'
import { useStylesGlobal } from '../Styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';


const INITIAL_STATE = {
  _id: "",
  id: NaN,
  id_client: NaN,
  product: "",
  amount: NaN,
  measure: "",
  category: "",
  sub_category: "",
}

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  // TableHead,
  TableHead: CustomTableHead, 
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function rowContent(
    _index: number, 
    row: Data, 
    columnsTable: ColumnData[], 
    classes: any, 
    openUpdateAmountStock:(newData: Data) => void, 
  ) {

  let newRow = { ...row } // Create a copy of the item to add in the same level the custom_fields
  // console.log("newRow: ", newRow)
  if (newRow.custom_fields) {
    for (const key in newRow.custom_fields) {
      newRow = {
            ...newRow,
            ...newRow.custom_fields
          }
    }
  }

  return (
    <React.Fragment >
      {columnsTable.map((column) => (
        <TableCell
          key={column.id}
          align='center'
          onClick={() => openUpdateAmountStock({
              "_id":newRow._id, 
              "id": newRow.id, 
              "id_client": newRow.id_client, 
              "product": newRow.product, 
              "amount": newRow.amount, 
              "measure": newRow.measure, 
              "category": newRow.category, 
              "sub_category": newRow.sub_category,
              "id_sub_category": newRow.id_sub_category, 
              "code": newRow.code, 
              "price": newRow.price, 
              "description": newRow.description, 
              "url_image": newRow.url_image, 
              "alert_amount": newRow.alert_amount, 
              "alert_amount_enabled": newRow.alert_amount_enabled, 
              "alerted_amount": newRow.alerted_amount, 
              "alert_date": newRow.alert_date, 
              "alert_date_enabled": newRow.alert_date_enabled, 
              "alerted_date": newRow.alerted_date, 
              "newRow": newRow})}
          className={`${ _index%2 ? classes.table_row_odd : classes.table_row_even }`}
          style={{ 
             border:0,
          }}
          sx={{
            padding: "0",
          }}
        >
          <div 
            className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? `${classes.table_alert_on_background} ${classes.table_alert_on_color}`  : "" } ${classes.table_rows}  ${classes.table_rows_color}`}
          > 
            <Tooltip 
                title={newRow[column.dataKey]} 
                disableHoverListener={String(newRow[column.dataKey])?.length <= 13}
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
                    textDecoration:  ((column.dataKey === "alert_amount" && !newRow['alert_amount_enabled']) || (column.dataKey === "alert_date" && !newRow['alert_date_enabled'])) ? 'line-through' : "",
                  }}
                >
                  { ( newRow[column.dataKey] || newRow[column.dataKey] === 0 ) ? newRow[column.dataKey] : "-"}
                </Typography>
            </Tooltip> 
          </div>
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableProducts(
  { data, 
    openUpdateAmountStock, 
  }:  DataTable ) {

  const  {classes} = useStylesGlobal()
  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const breakpointMD = useMediaQuery('(min-width: 724px)');

//   const { user } = useContext<any>(UserContext);
//   const { columns, columnsUserOrder  } = useContext<any>(ColumnsContext);
  const  columns =[{}];
  const  columnsUserOrder   =[{}];
  const elementToAdd = { dataKey: "check_stock", id: 0, width: 40, label: "Stock", deleted: false };
//   const columnsTable = [elementToAdd, ...columnsUserOrder];
  const columnsTable = [elementToAdd];

  const initialManageColumns = columns.map((column:any) => {
    const foundColumn = columnsUserOrder.find((columnUserOrder:any) => columnUserOrder._id === column._id)
    const isInArray = foundColumn !== undefined ? true : false;
    return {_id:column._id, id:column.id, width:column.width, label: column.label, dataKey:column.dataKey, showInTable: isInArray}
  })
  initialManageColumns.sort((a:any, b:any) => {
    if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
    if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
    return 0;
  })

  const [manageColumns, setManageColumns] = useState(initialManageColumns)
  const [filteredRows, setFilteredRows] = useState<Data>(INITIAL_STATE);
  const [filteredData, setFilteredData] = useState(data)
  const [sortedData, setSortedData] = useState(data)
  const [rowsUserSort, setRowsUserSort] = useState({
    field: "_id",
    id: -1,
    asc: true
  })

  const formatAlertDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.getTime() // Returns the time in miliseconds since January 1, 1970 (UNIX timestamp)
  }

  const orderByField = (field: any, id: number, calledFrom: string) => {
    if(field==="url_image")
      return
    let newSortAsc:boolean = true
    if(calledFrom === "onClick"){
      newSortAsc = (field === rowsUserSort.field ? !rowsUserSort.asc: rowsUserSort.asc)
    } else{
      newSortAsc = rowsUserSort.asc
    }
    const arraySorted = filteredData.slice();
    setRowsUserSort({field, id, asc: newSortAsc});
    let aField: string | number, bField: string | number
    arraySorted.sort((a, b) => {
      if(field === "alert_date" ){
        if(typeof a[field] === "string"){
          const parts = a[field].split("/")
          if (parts.length === 3) {
            const aDate = new Date( +parts[2], +parts[1] - 1, +parts[0]);
            aField = aDate.getTime()
          }
        } else {
          aField = 0
        }
        if(typeof b[field] === "string"){
          const parts = b[field].split("/")
          if (parts.length === 3) {
            const bDate = new Date( +parts[2], +parts[1] - 1, +parts[0]);
            bField = bDate.getTime()
          }
        } else {
          bField = 0
        }
      } else if(id > 0){  // Condition for custom fields
        if (a.custom_fields && a.custom_fields[field]){
          aField = a.custom_fields[field].toLowerCase() 
        } else {
          aField ="-"
        }
        if (b.custom_fields && b.custom_fields[field]){
          bField = b.custom_fields[field].toLowerCase() 
        } else {
          bField ="-"
        }
      } else {
        if (typeof a[field] === "string"){
          aField = a[field].toLowerCase()
        } else if (a[field] === undefined){
          aField ="-"
        } else {
          aField = a[field]
        }
        if (typeof b[field] === "string"){
          bField = b[field].toLowerCase()
        } else if (b[field] === undefined){
          bField ="-"
        } else {
          bField = b[field]
        }
      }
      
      if(newSortAsc ){
        if (aField < bField) return -1;
        if (aField > bField) return 1;
        return 0;
      } else {
        if (aField < bField) return 1;
        if (aField > bField) return -1;
        return 0;
      }
    })
    setSortedData(arraySorted);
  }
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const openTableOptions = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // Delay resetting anchorEl until after the menu has closed
        setAnchorEl(null);
    };
  
  
  const handleClose2 = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const handlePickColumn = (columnSelected: any) => {
    if(columnSelected.id === -1) return
    const indexColumnUserOrder = columnsUserOrder.findIndex((columnUserOrder:any) => columnUserOrder._id === columnSelected._id);
    const actualColumnUserOrder = columnsUserOrder
    const indexManageColumn = manageColumns.findIndex((manageColumn:any) => manageColumn._id === columnSelected._id);
    const actualManageColumn = manageColumns
    if (indexColumnUserOrder !== -1) {
      actualColumnUserOrder.splice(indexColumnUserOrder, 1);
      actualManageColumn[indexManageColumn].showInTable = false
    } else {
      actualColumnUserOrder.push(columnSelected)
      actualManageColumn[indexManageColumn].showInTable = true
    }

    const array_ordered_fields = actualColumnUserOrder.map((col:any)=>col.id)

    setManageColumns(actualManageColumn)
  }

  return (
    
<div>
    <Paper style={{backgroundColor: "rgb(0, 0, 0, 0)", height: `calc(100dvh - ${(breakpointLG?"105px":"150px")})`, width: (breakpointLG?"98vw":"94vw"), margin: "12px auto 0 auto" ,borderRadius: "10px"}}>
      <TableVirtuoso 
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
                    className={`${classes.main_background_colorD} ${classes.table_header_color}`}
                    
                    style={{ 
                      width: columnTable.width, 
                      border:0
                    }}
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <Typography noWrap
                      sx={{
                        padding: "0 4px ",
                      }}
                      onClick={(e:any)=> {
                        e.stopPropagation() // Prevent the click event from propagating to the parent cell
                        orderByField(columnTable.dataKey, columnTable.id, "onClick")
                      }} 
                    >
                      { columnTable.label ? 
                            columnTable.label 
                          : 
                          <>
                            <IconButton
                              onClick={
                                openTableOptions
                              }
                              className={classes.table_header_color}
                              style={{ 
                                width: "30px", 
                                border:0
                              }}
                              sx={{
                                padding: "0",
                                top: "-5px",
                              }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>  
                            <Menu
                              disableScrollLock={true}
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              style={{ 
                                marginTop: '20px', 
                                marginLeft: '15px',
                              }}
                              MenuListProps={{
                                  sx: { padding: 0,  
                                  },
                              }}
                            >
                            </Menu>
                            <Menu
                              className={`${classes.table_menu} ${classes.table_menu_background_color}`}
                              id="demo-positioned-menu2"
                              aria-labelledby="demo-positioned-button2"
                              anchorEl={anchorEl2}
                              open={open2}
                              onClose={handleClose2}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              style={{ 
                                marginTop: '-57px', 
                                marginLeft: '0px',
                                height: '370px',
                              }}
                              MenuListProps={{
                                  sx: { padding: 0,
                                  },
                              }}
                            >
                              {manageColumns.map((manageColumn:any) => (
                                <MenuItem 
                                  key={manageColumn.id}
                                  onClick={() => handlePickColumn(manageColumn) }
                                  className={`${classes.menu_item} ${classes.menu_item_background_color}`} 
                                >
                                  <Typography 
                                    align="center" 
                                    variant="body2" 
                                  > 
                                    <Switch 
                                      size='small'
                                      color='success'  
                                      checked={manageColumn.showInTable}
                                    />  
                                      {manageColumn.label}
                                      {manageColumn.id==-1 ? 
                                        <LockIcon 
                                          style={{
                                            paddingTop: "10px",
                                          }}
                                          fontSize='small'
                                        /> 
                                      : 
                                        "" }
                                  </Typography>
                                </MenuItem> 
                              ))}
                            </Menu>
                          </>
                        }
                        </Typography>
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
              openUpdateAmountStock
          ) 
        }
        
      />
    </Paper>

</div>

  
  );
}