import React from 'react';
import DatePicker from 'react-datepicker';
import { useRecurrenceStore } from '../store/recurrenceStore';
import RecurrenceOptions from './RecurrenceOptions';
import DatePreview from './DatePreview';
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useRecurrenceStore();

  return (
    <div className='mt-5 d-flex justify-content-around'>
      <div>
      <div className='d-flex align-items-center'>
      <h3 className='me-3 text-info'>Start Date:</h3>
      <DatePicker selected={startDate} onChange={setStartDate}/>
      </div>
      <div className='d-flex align-items-center mt-5'>
      <h3 className='me-4 text-info'>End Date:</h3>
      <DatePicker selected={endDate} onChange={setEndDate}/>
      </div>
      <RecurrenceOptions/>
      </div>
      <DatePreview/>
    </div>   
  
  );
};

export default CustomDatePicker;
