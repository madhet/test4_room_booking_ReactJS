import React from 'react'

export default function TimePicker(props) {
  const { id, label, availableHours, disabled, value, onChange } = props;

  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const filteredHours = availableHours.length ? availableHours : hours

  const formattedHours = filteredHours.map(option => {
    return (option < 10 ? "0" + option : option) + ":00";
  });

  if (filteredHours.length) {
    return (
      <div className='timepicker-container'>
        <label className={'input-label inline-label' + (disabled ? ' disabled' : '')} htmlFor="hours">{label}</label>
        <select
          className='input-field input-select'
          name="hours"
          id={id}
          disabled={disabled}
          value={value ? value : '--:--'}
          onChange={onChange}>
          <option value='--:--' disabled>--:--</option>
          {formattedHours.length &&
            formattedHours.map((label, idx) => (
              <option key={filteredHours[idx]} value={filteredHours[idx]}>
                {label}
              </option>
            ))}
        </select>
      </div >
    );
  }
  return null;
}

