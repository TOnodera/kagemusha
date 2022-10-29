import { useState } from 'react';
import ScheduleCard from '../../atom/card/schedule-card/ScheduleCard';
import { v4 as uuid } from 'uuid';
import style from './style.module.scss';
const ScheduleCards = () => {
  const makeDefaultSchedule = () => {
    return { id: uuid(), from: '00:00', to: '00:00' };
  };
  const [scheduleCards, setScheduleCards] = useState({
    cards: [
      {
        id: uuid(),
        schedules: [makeDefaultSchedule()]
      }
    ]
  } as ScheduleCards);

  const onAddSchedule = (cardId: string) => {
    setScheduleCards((scheduleCards) => {
      const cards = scheduleCards.cards.map((card) => {
        if (card.id === cardId) {
          return {
            id: card.id,
            schedules: [...card.schedules, { ...makeDefaultSchedule() }]
          };
        }
        return card;
      });
      return { cards };
    });
  };

  /*
  const onChangeSchedule = (
    cardId: string,
    scheduleId: string,
    newSchedule: Schedule
  ) => {
    setScheduleCards((scheduleCards) => {
      const cards = scheduleCards.cards.map((card) => {
        if (card.id === cardId) {
          const schedules = card.schedules.map((schedule) => {
            // 変更対象
            if (schedule.id === scheduleId) {
              return newSchedule;
            }
            // 変更対象以外は元のデータを返す
            return schedule;
          });
          return {
            id: card.id,
            schedules
          };
        }
        return card;
      });
      return { cards };
    });
  };
  */

  const onDeleteSchedule = (cardId: string, scheduleId: string) => {
    setScheduleCards((scheduleCards) => {
      // const newScheduleCards = Object.assign({}, scheduleCards);
      // delete newScheduleCards.cards[cardIdx].schedules[scheduleIdx];
      const cards = scheduleCards.cards.map((card) => {
        const schedules = card.schedules.filter((schedule) => {
          console.log(card.id, cardId, schedule.id, scheduleId);
          return !(card.id === cardId && schedule.id === scheduleId);
        });
        return { id: card.id, schedules };
      });

      return { cards };
    });
  };

  return (
    <div className={style.scheduleCards}>
      {scheduleCards.cards.map((card) => (
        <ScheduleCard
          onAddSchedule={onAddSchedule}
          onDeleteSchedule={onDeleteSchedule}
          cardId={card.id}
          schedules={card.schedules}
          key={card.id}
        />
      ))}
    </div>
  );
};

export default ScheduleCards;
