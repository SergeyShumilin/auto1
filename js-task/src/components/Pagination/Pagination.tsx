// A component to render a pagination.
import * as React from 'react';
import classNames from 'classnames';

interface Props {
  current: number;
  total: number;
  onChange?(page: number): void;
}

export default React.memo(
  ({ current, total, onChange = () => null }: Props) => {
    const noPagesBeforeAvailable = current === 1;
    const noPagesAfterAvailable = current === total;

    return (
      <div className="pagination font-r3">
        <span
          className={classNames('link', { disabled: noPagesBeforeAvailable })}
          onClick={() => onChange(1)}
        >
          First
        </span>
        <span
          className={classNames('link', { disabled: noPagesBeforeAvailable })}
          onClick={() => onChange(current - 1)}
        >
          Previous
        </span>
        <span className="text">
          Page {current} of {total}
        </span>
        <span
          className={classNames('link', { disabled: noPagesAfterAvailable })}
          onClick={() => onChange(current + 1)}
        >
          Next
        </span>
        <span
          className={classNames('link', { disabled: noPagesAfterAvailable })}
          onClick={() => onChange(total)}
        >
          Last
        </span>
      </div>
    );
  }
);
