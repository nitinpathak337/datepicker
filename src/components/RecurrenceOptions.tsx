import React from 'react';
import { useRecurrenceStore } from '../store/recurrenceStore';
import CustomRecurrence from './CustomRecurrence';

const RecurrenceOptions = () => {
  const { recurrenceType, setRecurrenceType } = useRecurrenceStore();

  return (
    <div className='mt-5'>
      <div className='d-flex'>
      <h3 className='me-4 text-info'>Recurrence:</h3>
      <select
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="custom">Custom</option>
      </select>
      </div>
      <div>
      {recurrenceType === 'custom' && <CustomRecurrence />}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
