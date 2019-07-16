// Default Select.
import * as React from 'react';
import { Event } from '../types';

interface Props {
  id: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange?(event: Event): void;
}

export default React.memo(
  ({ id, label, options = [], value, onChange = () => null }: Props) => (
    <div className="select-component font-r2" data-testid={id + '-select'}>
      <label className="font-r3" htmlFor={id + '-select'}>
        {label}
      </label>
      <select id={id + '-select'} onChange={onChange} value={value}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
);
