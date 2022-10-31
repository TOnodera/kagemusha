import ErrorButton from '../../button/error-button/ErrorButton';
import style from './style.module.scss';

interface Props {
  onClick: () => void;
  show: boolean;
}
const ReservedElement = (props: Props) => {
  console.log(props.show);
  return (
    <div
      className={style.reservedElement}
      style={{ display: props.show ? 'block' : 'none' }}
    >
      <h4>✅実行予約済みです</h4>
      <div>
        <ErrorButton text="予約解除" onClick={props.onClick} />
      </div>
    </div>
  );
};

export default ReservedElement;
