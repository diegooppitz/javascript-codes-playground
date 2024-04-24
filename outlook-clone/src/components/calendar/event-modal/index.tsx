import React, { useEffect, useState } from 'react';
import './eventModal.scss';
import { EventModalProps } from '@/types';

const mockFormData = {
  eventTitle: '',
  endDate: '',
  allDay: false,
  eventDescription: ''
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, suggestedDate }) => {
  const [formData, setFormData] = useState({
    ...mockFormData,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  useEffect(() => {
    setFormData({
      ...mockFormData,
      startDate: suggestedDate.selectedDate,
      endDate: suggestedDate.selectedDate,
      startTime: suggestedDate.startTime,
      endTime: suggestedDate.endTime,
    })
  }, [suggestedDate])


  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <span className='close' onClick={onClose}></span>
          <h2>New Event</h2>
        </div>
        <div className='modal-body'>
          <form onSubmit={handleSubmit}>
            <input placeholder="Add a title" className="input-title" type='text' name='eventTitle' value={formData.eventTitle} onChange={handleChange} />

            <div className="date-configs">
              <div className="inputs-date-config">
                <input type='date' name='startDate' value={formData.startDate} onChange={handleChange} disabled={formData.allDay} />
                <input type='time' name='startTime' value={formData.startTime} onChange={handleChange} disabled={formData.allDay} />

                <div className="input-all-day">
                    <input type='checkbox' id='allDay' name='allDay' checked={formData.allDay} onChange={handleChange} />
                    <label htmlFor='allDay'>All Day</label>
                  </div>
              </div>

              <div className="inputs-date-config">
                <input type='date' name='endDate' value={formData.endDate} onChange={handleChange} disabled={formData.allDay} />
                <input type='time' name='endTime' value={formData.endTime} onChange={handleChange} disabled={formData.allDay} />
              </div>
            </div>

            <label htmlFor='eventDescription'>Event Description:</label>
            <textarea id='eventDescription' name='eventDescription' value={formData.eventDescription} onChange={handleChange}></textarea>

            <div className='modal-footer'>
              <button className="SubmitButton" type='submit'>Create</button>
              <button className="cancelButton" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;