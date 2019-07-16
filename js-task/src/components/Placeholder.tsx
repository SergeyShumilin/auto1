// A placeholder is used to reserve space for content that soon will appear in a layout.
import * as React from 'react';

export default () => (
  <div className="cars-list-item placeholder">
    <div className="image" />
    <div className="content">
      <div className="name font-b2">name</div>
      <div className="info font-r3">info</div>
      <div className="font-r3 link-placeholder">view details</div>
    </div>
  </div>
);
