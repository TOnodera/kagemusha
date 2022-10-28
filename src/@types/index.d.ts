interface Schedule {
  from: string;
  to: string;
}

interface Schedules {
  schedules: Schedule[];
}

interface ScheduleCards {
  cards: Schedules[];
}
