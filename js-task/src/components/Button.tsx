// A standard button.
import * as React from 'react';

interface Props {
  label: string;
  onClick(): void;
}

export default React.memo(({ label, onClick = () => null }: Props) => (
  <button onClick={onClick}>{label}</button>
));
