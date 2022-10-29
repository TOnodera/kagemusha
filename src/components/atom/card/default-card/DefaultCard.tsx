import BasicButton from '../../button/basic-button/BasicButton';
import Card from '../card/Card';
import style from './style.module.scss';

interface Props {
  onStartButton: () => void;
}
const DefaultCard = (props: Props) => {
  return (
    <Card>
      <div className={style.content}>
        <p>
          今すぐ起動したい場合はこのボタンを押してください。
          Teamsで退席中にならないようにします。
        </p>
      </div>
      <BasicButton text="今すぐ起動する" onClick={props.onStartButton} />
    </Card>
  );
};

export default DefaultCard;
