interface Schedule {
  id: string;
  from: string;
  to: string;
}

interface Card {
  id: string;
  schedules: Schedule[];
}

interface ScheduleCards {
  cards: Card[];
}
