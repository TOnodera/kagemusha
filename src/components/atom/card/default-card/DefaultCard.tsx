import { useState } from 'react';
import { pressControlKey } from '../../../../commands/pressControlKeyCommand';
import { DURATION } from '../../../../consts/time';
import BasicButton from '../../button/basic-button/BasicButton';
import ErrorButton from '../../button/error-button/ErrorButton';
import Loading from '../../loading/Loading';
import Overlay from '../../overlay/Overlay';
import Card from '../card/Card';
import style from './style.module.scss';

interface Props {
  setRunningFlagIsOn: () => void;
  setRunningFlagIsOff: () => void;
}
const DefaultCard = (props: Props) => {
  const { setRunningFlagIsOn, setRunningFlagIsOff } = props;
  const [runntinTimerId, setRunningTimerId] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 今すぐ開始ボタンクリック時の処理
  const onStartButtonClick = () => {
    const id = window.setInterval(() => {
      pressControlKey();
    }, DURATION);
    setIsRunning(true);
    setRunningTimerId(id);
    setRunningFlagIsOn();
  };

  // 今すぐ開始ボタンで起動した場合の停止処理
  const onStopButtonClick = () => {
    if (isRunning) {
      clearInterval(runntinTimerId);
      setRunningTimerId(0);
      setIsRunning(false);
      setRunningFlagIsOff();
    }
  };

  return (
    <>
      <Card>
        <div className={style.content}>
          <p>
            今すぐ起動したい場合はこのボタンを押してください。
            Teamsで退席中にならないようにします。
          </p>
        </div>
        <BasicButton
          disabled={false}
          text="今すぐ起動する"
          onClick={onStartButtonClick}
        />
      </Card>
      <Overlay isDisplay={isRunning}>
        <Loading text="実行中" />
        <ErrorButton text="停止" onClick={onStopButtonClick} />
      </Overlay>
    </>
  );
};

export default DefaultCard;
