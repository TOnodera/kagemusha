import { useState } from 'react';
import './App.scss';
import Titlebar from './components/window/titlebar/Titlebar';
import DefaultCard from './components/atom/card/default-card/DefaultCard';
import ContentsArea from './components/atom/contents-area/ContentsArea';
import ScheduleCard from './components/organization/schedule-card/ScheduleCard';

function App() {
  const [isRunningFlag, setIsRunningFlag] = useState(false);

  const setRunningFlagIsOn = () => {
    setIsRunningFlag(true);
  };

  const setRunningFlagIsOff = () => {
    setIsRunningFlag(false);
  };

  return (
    <>
      <Titlebar />
      <ContentsArea>
        <DefaultCard
          setRunningFlagIsOn={setRunningFlagIsOn}
          setRunningFlagIsOff={setRunningFlagIsOff}
          isRunningFlag={isRunningFlag}
        />
        <ScheduleCard
          setRunningFlagIsOn={setRunningFlagIsOn}
          setRunningFlagIsOff={setRunningFlagIsOff}
          isRunningFlag={isRunningFlag}
        />
      </ContentsArea>
    </>
  );
}

export default App;
