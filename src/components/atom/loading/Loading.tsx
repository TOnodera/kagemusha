import loading from '../../../assets/loading.gif';
import style from './style.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}
const Loading = (props: Props) => {
  return (
    <div className={style.loadingWrapper} onClick={props.onClick}>
      <div className={style.loading}>
        <img src={loading} alt={props.text} />
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Loading;
