import style from './style.module.scss';
interface Props {
  text: string;
}
const ErrorButton = (props: Props) => {
  return (
    <div className={style.errorButtonWrapper}>
      <button type="button" className={style.errorButton}>
        {props.text}
      </button>
    </div>
  );
};

export default ErrorButton;
