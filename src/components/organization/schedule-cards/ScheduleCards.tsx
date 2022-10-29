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

  const onDeleteSchedule = (cardId: string, scheduleId: string) => {
    // 1個しかない場合は削除させない
    const count = scheduleCards.cards.find((card) => cardId === card.id)
      ?.schedules.length;
    if (!count) {
      return;
    }
    if (count <= 1) {
      return;
    }
    // データ更新
    setScheduleCards((scheduleCards) => {
      const cards = scheduleCards.cards.map((card) => {
        const schedules = card.schedules.filter((schedule) => {
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
