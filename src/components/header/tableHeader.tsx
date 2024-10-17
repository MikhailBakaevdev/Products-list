import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TableHeaderProps } from './types';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.h2,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const Header = ({title}: TableHeaderProps) => {
  return <Div>{title}</Div>;
}