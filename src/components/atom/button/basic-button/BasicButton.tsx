import style from './style.module.scss';
interface Props {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
}

const BasicButton = (props: Props) => {
  const backgroundColor = props.backgroundColor ?? '#777ee3';
  const color = props.color ?? '#fff';
  const pointerEvents = props.disabled ? 'none' : 'auto';
  return (
    <div className={style.basicButtonWrapper}>
      <button
        type="button"
        onClick={props.onClick}
        className={style.basicButton}
        style={{ color, backgroundColor, pointerEvents }}
      >
        {props.text}
      </button>
    </div>
  );
};

export default BasicButton;
