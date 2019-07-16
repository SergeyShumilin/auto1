// Component which renders list of items, e.g. car list
import * as React from 'react';
import { Pagination, Select, Placeholder } from '../../../components';
import { ListItem } from '..';
import { SORT_OPTIONS } from './List.constants';
import { Event } from '../../../types';

interface Props {
  items: { id: number; name: string; info: string }[];
  totalItemsCount: number;
  totalPagesCount: number;
  page: number;
  sort: string;
  onPageChange(page: number): void;
  onSortChange(sort: Event): void;
  loading: boolean;
}

export default ({
  items = [],
  totalItemsCount = 0,
  totalPagesCount = 0,
  page = 1,
  sort,
  onPageChange = () => null,
  onSortChange = () => null,
  loading
}: Props) => {
  let itemsToRender = items;

  if (loading) {
    itemsToRender = [];

    for (let i = 0; i < 10; i++) {
      itemsToRender.push({ id: 0, name: '', info: '' });
    }
  }

  return (
    <div className="cars-list" data-testid="cars-list">
      <div className="cars-list-header">
        <div className="title">
          <h1 className="font-b2">Available cars</h1>
          <div className="font-r1" data-testid="results-text">
            Showing {items.length} of {totalItemsCount} results
          </div>
        </div>
        <div className="sort">
          <Select
            id="sort"
            label="Sort by"
            options={SORT_OPTIONS}
            value={sort}
            onChange={onSortChange}
          />
        </div>
      </div>
      <div className="cars-list-content">
        {itemsToRender.map(({ id, name, info }, key) =>
          loading ? (
            <Placeholder key={'placeholder-' + key} />
          ) : (
            <ListItem key={id} id={id} name={name} info={info} />
          )
        )}
      </div>
      <Pagination
        current={page}
        total={totalPagesCount}
        onChange={onPageChange}
      />
    </div>
  );
};
