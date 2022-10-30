interface Schedule {
  id: string;
  from: string;
  to: string;
}

interface Schedules {
  schedules: Schedule[];
}

interface ScheduleTime {
  id: string;
  fromHour: string;
  fromMinute: string;
  toHour: string;
  toMinute: string;
}
