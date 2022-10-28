import style from './style.module.scss';
interface Props {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
}

const BasicButton = (props: Props) => {
  const backgroundColor = props.backgroundColor ?? '#777ee3';
  const color = props.color ?? '#fff';
  return (
    <div className={style.basicButtonWrapper}>
      <button
        type="button"
        onClick={props.onClick}
        className={style.basicButton}
        style={{ color, backgroundColor }}
      >
        {props.text}
      </button>
    </div>
  );
};

export default BasicButton;
