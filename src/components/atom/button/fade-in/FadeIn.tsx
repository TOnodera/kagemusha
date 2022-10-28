import style from './style.module.scss';

interface Props {
  children: React.ReactNode;
}
const FadeIn = (props: Props) => {
  return <div className={style.fadeIn}>{props.children}</div>;
};

export default FadeIn;
