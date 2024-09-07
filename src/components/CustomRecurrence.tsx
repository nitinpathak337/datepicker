import React, { useState } from 'react';
import { useRecurrenceStore } from '../store/recurrenceStore';
import { initialMonthCustomOptions, weekDaysArr } from '@/constants/constants';

const CustomRecurrence = () => {
  const [frequency, setFrequency] = useState(1);
  const [unit, setUnit] = useState('days');
  const { setCustomRecurrence } = useRecurrenceStore();
  const [selectedWeekDays,setSelectedWeekDays] = useState([]);
  const [monthCustomOptions,setMonthCustomOptions]=useState(initialMonthCustomOptions)
  const [monthCustomizationEnabled,setMonthCustomizationEnabled] = useState(false)

  const updateRecurrence = () => {
    setCustomRecurrence({ frequency, unit, selectedWeekDays,monthCustomOptions});
  };

  const handleWeekDayCheck =(event:any)=>{
    const day = event.target.value;
    if(selectedWeekDays.includes(day)){
      const updatedWeekDays = selectedWeekDays.filter(d=>d!==day)
      setSelectedWeekDays(updatedWeekDays)
    }
    else{
      setSelectedWeekDays((prev)=>([...prev,day]))
    }
  }

  const renderWeekCheckboxes =()=>{
    return(
      <>      
      <p>on</p>

      {weekDaysArr.map((d)=>(
        <>
      <input className='me-2' type='checkbox' value={d} onChange={handleWeekDayCheck} checked={selectedWeekDays.includes(d)}/>
      <label className='me-3'>{d}</label>
      </>
    )
    
    )}
  </>
    )
  }

  const renderMonthCustomizationOptions =()=>{
    return(
      <>
      <input  className="me-2" type='radio' checked={monthCustomizationEnabled} onClick={()=>{
        if(monthCustomizationEnabled){
          setMonthCustomOptions(initialMonthCustomOptions)
        }else{
          setMonthCustomOptions({day:'Sun',weekOfMonth:'first'})
        }
        setMonthCustomizationEnabled((prev)=>!prev)}
        }/>
      <label className="me-2">on the</label>
      {monthCustomizationEnabled && 
      <>
      <select
        className="me-2"
        value={monthCustomOptions.weekOfMonth}
        onChange={(e) => {setMonthCustomOptions((prev)=>({...prev,weekOfMonth:e.target.value}))}}
      >
        <option value="first">first</option>
        <option value="second">second</option>
        <option value="third">third</option>
        <option value="fourth">fourth</option>
        <option value="fifth">fifth</option>
      </select>
      <select className="me-2" value={monthCustomOptions.day} onChange={(e) => {setMonthCustomOptions((prev)=>({...prev,day:e.target.value}))}}>
        {weekDaysArr.map((d)=><option value={d}>{d}</option>)}
      </select>
      </>
      }
      </>
    )
  }

  return (
    <div className='mt-3'>
      <label className='me-2'>Every</label>
      <input
        className='me-2'
        type="number"
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
      />
      <select
        className='me-2'
        value={unit}
        onChange={(e) => {setUnit(e.target.value) ;setSelectedWeekDays([]);setMonthCustomOptions({day:null,weekOfMonth:null});setMonthCustomizationEnabled(false)}}
      >
        <option value="days">Days</option>
        <option value="weeks">Weeks</option>
        <option value="months">Months</option>
        <option value="years">Years</option>
      </select>
      {unit==='weeks' && renderWeekCheckboxes()}
      {unit==='months' && renderMonthCustomizationOptions()}
      <button
        className='d-block btn btn-primary mt-4'
        onClick={updateRecurrence}
      >
        Set Recurrence
      </button>
    </div>
  );
};

export default CustomRecurrence;
