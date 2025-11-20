
import dayjs from 'dayjs';// Import dayjs
import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import useMediaQuery from '@mui/material/useMediaQuery'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';


interface DatePickerComponentProps {
    dateProp: Date | null;
    setDateProp: (visible: Date) => void;
    labelProp?: string;
}

export default function DatePickerComponent({ dateProp, setDateProp, labelProp }: DatePickerComponentProps) {
    
    const breakpointLG = useMediaQuery('(min-width:1024px)')
    const DatePickerComponent = breakpointLG ? DatePicker : MobileDatePicker;
    
    const [openDatePicker, setOpenDatePicker] = useState(false);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDatePickerChange = (newDate:any) => { 
        const adjustedDate = newDate.add(2, 'hour').toISOString(); // Adding 2 hours because the GMT comes in +0200 and returns the day before
        setDateProp(adjustedDate);
      };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} >
                <DatePickerComponent
                    className="border rounded-lg p-2 bg-white"
                    label={labelProp}
                    format="DD/MM/YYYY"
                    defaultValue = { dateProp? dayjs(dateProp) : null}
                    onChange={ (newDate) => handleDatePickerChange(newDate) }
                    slotProps={{
                        textField: {
                            size: 'small',
                            InputProps: {
                            endAdornment: (
                            <InputAdornment
                                position="end"
                            >
                            <CalendarMonthRoundedIcon 
                                onClick = {() => setOpenDatePicker(true)}
                                style={{cursor: "pointer"} }
                            />
                            </InputAdornment>
                            ),
                            },
                        },
                    }}
                    sx={{ 
                        marginTop: "-8px !important"
                    }} 
                    open={breakpointLG ? openDatePicker :undefined}
                    onClose={breakpointLG ? () => setOpenDatePicker(false) :()=>{}}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}