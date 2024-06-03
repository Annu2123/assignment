import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, getDay, format, addMinutes, differenceInMinutes } from 'date-fns';
import { Form } from 'react-bootstrap'

export default function SlotForm() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [timeInterval, setTimeInterval] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null);

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0
  }

  const handleDateChange = (date) => {
    if (isWeekday(date)) {
      setSelectedDate(date)
      generateTimeSlots(date, timeInterval)
    }
  }

  const handleTimeInterval = (e) => {
    setTimeInterval(e.target.value)
    if (selectedDate) {
      generateTimeSlots(selectedDate, e.target.value)
    }
  }

  const generateTimeSlots = (date, interval) => {
    if (!interval) return

    const startTime = setHours(setMinutes(new Date(date), 0), 9)
    const endTime = setHours(setMinutes(new Date(date), 0), 17)

    const totalMinutes = differenceInMinutes(endTime, startTime)
    const slots = []

    for (let i = 0; i <= totalMinutes; i += parseInt(interval)) {
      slots.push(addMinutes(startTime, i))
    }

    setTimeSlots(slots)
  }

  const toggleSlot = (slot) => {
    setSelectedSlot(selectedSlot === slot ? null : slot)
  }
  return (
    <div className=" align-items-center vh-100">
      <h2>Select timings</h2>
      <div>
        <Form.Group className="mb-0">
          <label>select Date:</label>
          <DatePicker

            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showTimeSelect
            placeholderText='select Date'
            minDate={new Date()}
            filterDate={isWeekday}
          // filterTime={filterPassedTime}                                                                                            
          />
        </Form.Group>
        {/* <label>Select a date (Monday to Saturday): </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={isWeekday}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        /> */}
      </div>
      <div>
        <label>Select a time interval in Minutes: </label>
        <input
          type="number"
          value={timeInterval}
          onChange={handleTimeInterval}
        />
      </div>
      <Form.Group controlId="seatSelection">
        <Form.Label className="text-center"><strong>Select Slot</strong></Form.Label>
        <div style={{ border: '2px solid #03cffc', padding: '10px', width: '250px' }}>
          {timeSlots.map((slot, index) => (
            <div className={'rounded text-center'}
              key={index}
              onClick={() => toggleSlot(index + 1)}
              style={{
                width: '40px',
                height: '35px',
                border: '1px solid #037ffc',
                margin: '2px',
                display: 'inline-block',
                backgroundColor: selectedSlot === index + 1 ? '#0b7a0f' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {format(slot, 'HH:mm')}

            </div>
          ))}
        </div>

      </Form.Group>

    </div>
  );
};


