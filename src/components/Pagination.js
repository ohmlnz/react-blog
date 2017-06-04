import React from 'react';
import { Pager } from 'react-bootstrap';

export const Pagination = () => (
 <Pager>
    <Pager.Item disabled previous href="#" style={{display: 'none'}}>&larr; Previous Page</Pager.Item>
    <Pager.Item disabled next href="#">Next Page &rarr;</Pager.Item>
  </Pager>
)