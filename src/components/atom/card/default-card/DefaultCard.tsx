import BasicButton from '../../button/basic-button/BasicButton';
import Card from '../card/Card';
import style from './style.module.scss';
const DefaultCard = () => {
  return (
    <Card>
      <div className={style.content}>
        <p>
          今すぐ起動したい場合はこのボタンを押してください。
          Teamsで退席中にならないようにします。
        </p>
      </div>
      <BasicButton text="今すぐ起動する" />
    </Card>
  );
};

export default DefaultCard;
