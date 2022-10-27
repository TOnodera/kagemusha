import React from 'react';
import style from './style.module.scss';

interface Props {
  width?: number;
  height?: number;
  backgroundColor?: string;
  children: React.ReactNode;
}
const Card = (props: Props) => {
  return <div className={style.card}>{props.children}</div>;
};

export default Card;
