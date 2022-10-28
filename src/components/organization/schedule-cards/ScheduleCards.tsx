import { useState } from 'react';
import ScheduleCard from '../../atom/card/schedule-card/ScheduleCard';
import style from './style.module.scss';
const ScheduleCards = () => {
  const [scheduleCards, setScheduleCards] = useState({
    cards: [
      {
        schedules: [{ from: '00:00', to: '00:00' }]
      }
    ]
  } as ScheduleCards);

  const onChangeSchedule = (
    cardIdx: number,
    scheduleIdx: number,
    schedule: Schedule
  ) => {
    setScheduleCards((scheduleCards) => {
      const newScheduleCards = Object.assign({}, scheduleCards);
      newScheduleCards.cards[cardIdx].schedules[scheduleIdx] = schedule;
      return newScheduleCards;
    });
  };

  const onDeleteSchedule = (cardIdx: number, scheduleIdx: number) => {
    setScheduleCards((scheduleCards) => {
      const newScheduleCards = Object.assign({}, scheduleCards);
      delete newScheduleCards.cards[cardIdx].schedules[scheduleIdx];
      return newScheduleCards;
    });
  };

  return (
    <div className={style.scheduleCards}>
      {scheduleCards.cards.map((card, cardIdx) => (
        <ScheduleCard
          onChangeSchedule={onChangeSchedule}
          onDeleteSchedule={onDeleteSchedule}
          cardIdx={cardIdx}
          schedules={card.schedules}
          key={cardIdx}
        />
      ))}
    </div>
  );
};

export default ScheduleCards;
