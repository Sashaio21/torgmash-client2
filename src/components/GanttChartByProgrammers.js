import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { format, startOfMonth, endOfMonth, isWithinInterval, addMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Typography, Paper, Button, Box } from '@mui/material';

const COLORS = [
  '#1976d2', '#d32f2f', '#388e3c', '#fbc02d', '#7b1fa2',
  '#f57c00', '#0288d1', '#c2185b', '#388e3c', '#512da8'
];

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
      id: task._id,
      name: task.titleTask,
      start,
      duration: end - start,
      status: task.statusTask,
      executorName: task.executor?.name || 'Без исполнителя',
    };
  });
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { start, duration, name, status, executorName } = payload[0].payload;
    const monthStart = startOfMonth(new Date());
    const startDate = new Date(monthStart.getTime() + start * 24 * 60 * 60 * 1000);
    const endDate = new Date(monthStart.getTime() + (start + duration) * 24 * 60 * 60 * 1000);

    return (
      <Paper sx={{ padding: 1 }}>
        <Typography variant="subtitle2"><strong>{name}</strong></Typography>
        <Typography variant="body2">Исполнитель: {executorName}</Typography>
        <Typography variant="body2">Статус: {status}</Typography>
        <Typography variant="body2">С: {format(startDate, 'dd.MM.yyyy', { locale: ru })}</Typography>
        <Typography variant="body2">По: {format(endDate, 'dd.MM.yyyy', { locale: ru })}</Typography>
      </Paper>
    );
  }
  return null;
};

const GanttChartByExecutors = ({ tasks }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredTasks = filterTasksByMonth(tasks, currentMonth);

  // Словарь цветов для исполнителей
  const executorColors = useMemo(() => {
    const executors = [...new Set(filteredTasks.map(t => t.executor?.name || 'Без исполнителя'))];
    const map = {};
    executors.forEach((name, i) => {
      map[name] = COLORS[i % COLORS.length];
    });
    return map;
  }, [filteredTasks]);

  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Диаграмма Ганта — {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </Typography>
        <Typography variant="h6">Нет задач за этот месяц</Typography>
        <Box mt={2}>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>← Предыдущий месяц</Button>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Следующий месяц →</Button>
        </Box>
      </Box>
    );
  }

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
    <div style={{ width: '100%', height: 50 * data.length + 130 }}>
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

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
        >
          <XAxis
            type="number"
            domain={[0, daysInMonth]}
            ticks={ticks}
            tickFormatter={(day) =>
              format(new Date(monthStart.getTime() + day * 24 * 60 * 60 * 1000), 'dd.MM', { locale: ru })
            }
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* Прозрачный бар для сдвига начала */}
          <Bar dataKey="start" stackId="a" fill="transparent" />
          {/* Бар с цветом по исполнителю */}
          <Bar
            dataKey="duration"
            stackId="a"
            isAnimationActive={false}
            // Рисуем цвет по исполнителю для каждой задачи
            fill={(entry) => executorColors[entry.executorName]}
            shape={(props) => {
              // Кастомный прямоугольник с цветом для каждой задачи
              const { x, y, width, height, fill } = props;
              return <rect x={x} y={y} width={width} height={height} fill={fill} rx={3} ry={3} />;
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GanttChartByExecutors;
