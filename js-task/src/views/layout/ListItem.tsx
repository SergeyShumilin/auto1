import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  name: string;
  info: string;
}

export default ({ id, name, info }: Props) => (
  <div className="cars-list-item" data-testid="cars-list-item">
    <div className="image" />
    <div className="content">
      <div className="name font-b2">{name}</div>
      <div className="info font-r3">{info}</div>
      <div className="font-r3">
        <Link to={`/cars/${id}`} className="link" data-testid="details-link">
          View details
        </Link>
      </div>
    </div>
  </div>
);
