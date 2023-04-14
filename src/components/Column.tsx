import React from 'react'
import styled from 'styled-components'

import Row from './Row'

type ChildrenProp = {
  children: React.ReactNode;
  position: string;
  height: string;
  top: number;
  left: number;
  alignItems: string;
  zIndex: number;
  style: any;
  opacity: number;
  ref: React.ForwardedRef<unknown>;
};

const Column = React.forwardRef((props: ChildrenProp, ref) => <Row flexDirection='column' ref={ref} {...props} />)

export const ColumnDesktop = styled(Column) <ChildrenProp>`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
  }
`

export const ColumnMobile = styled(Column) <ChildrenProp>`
  display: flex;
  @media (min-width: 1200px) {
    display: none;
  }
`

export default Column
