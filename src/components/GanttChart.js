import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  format, startOfMonth, endOfMonth, isWithinInterval, addMonths,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { Typography, Paper, Button, Box } from '@mui/material';

const filterTasksByMonth = (tasks, monthDate) => {
  const start = startOfMonth(monthDate).getTime();
  const end = endOfMonth(monthDate).getTime();

  return tasks.filter((task) => {
    const created = new Date(task.createdAt).getTime();
    const deadline = new Date(task.deadline).getTime();
    return (
      isWithinInterval(created, { start, end }) ||
      isWithinInterval(deadline, { start, end })
    );
  });
};

const transformTasksToData = (tasks, monthDate) => {
  const monthStart = startOfMonth(monthDate).getTime();
  return tasks.map((task) => {
    const start = (new Date(task.createdAt).getTime() - monthStart) / (1000 * 60 * 60 * 24);
    const end = (new Date(task.deadline).getTime() - monthStart) / (1000 * 60 * 60 * 24);
    return {
      name: task.titleTask,
      start,
      duration: end - start,
      status: task.statusTask,
    };
  });
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { start, duration, name, status } = payload[0].payload;
    const monthStart = startOfMonth(new Date());
    const startDate = new Date(monthStart.getTime() + start * 24 * 60 * 60 * 1000);
    const endDate = new Date(monthStart.getTime() + (start + duration) * 24 * 60 * 60 * 1000);

    return (
      <Paper sx={{ padding: 1 }}>
        <Typography variant="subtitle2"><strong>{name}</strong></Typography>
        <Typography variant="body2">Статус: {status}</Typography>
        <Typography variant="body2">С: {format(startDate, 'dd.MM.yyyy', { locale: ru })}</Typography>
        <Typography variant="body2">По: {format(endDate, 'dd.MM.yyyy', { locale: ru })}</Typography>
      </Paper>
    );
  }
  return null;
};

const GanttChart = ({ tasks, width = '100%', height = 600 }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredTasks = filterTasksByMonth(tasks, currentMonth);
  const data = transformTasksToData(filteredTasks, currentMonth);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24);

  const step = 7;
  const ticks = Array.from(
    { length: Math.ceil(daysInMonth / step) + 1 },
    (_, i) => i * step
  );

  return (
    <div style={{ width, height }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          Диаграмма Ганта — {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </Typography>
        <Box>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} sx={{ mr: 1 }}>
            ← Предыдущий месяц
          </Button>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            Следующий месяц →
          </Button>
        </Box>
      </Box>

      {data.length === 0 ? (
        <Typography variant="h6">Нет задач за этот месяц</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            barCategoryGap={4}
            barGap={2}
          >
            <XAxis
              type="number"
              domain={[0, daysInMonth]}
              ticks={ticks}
              tickFormatter={(day) =>
                format(new Date(monthStart.getTime() + day * 24 * 60 * 60 * 1000), 'dd.MM', { locale: ru })
              }
            />
            <YAxis type="category" dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="start" stackId="a" fill="transparent" />
            <Bar dataKey="duration" stackId="a" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GanttChart;
