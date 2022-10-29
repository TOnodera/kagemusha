import style from './style.module.scss';

interface Props {
  children: React.ReactNode;
  isDisplay: boolean;
}
const Overlay = (props: Props) => {
  return (
    <div
      style={{ display: props.isDisplay ? 'block' : 'none' }}
      className={style.overlay}
    >
      <div className={style.content}>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Overlay;
