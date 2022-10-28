import style from './style.module.scss';

interface Props {
  children: React.ReactNode;
}
const ContentsArea = (props: Props) => {
  return <div className={style.contentsArea}>{props.children}</div>;
};

export default ContentsArea;
