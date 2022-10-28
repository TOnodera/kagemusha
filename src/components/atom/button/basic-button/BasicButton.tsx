import style from './style.module.scss';
interface Props {
  text: string;
}
const BasicButton = (props: Props) => {
  return (
    <div className={style.basicButtonWrapper}>
      <button type="button" className={style.basicButton}>
        {props.text}
      </button>
    </div>
  );
};

export default BasicButton;
