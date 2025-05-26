import '../styles/global.css';
import { Link } from 'react-router-dom';
import OneTask from './OneTask.js';
import axios from '../axios.js';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

function ListTasks({ idApplication }) {
  const [listTasksForSenior, setListTasksForSenior] = useState([]);

  useEffect(() => {
    if (!idApplication) return;

    axios.post('/senior/developer/all/task', {
      aplication: idApplication,
    })
    .then((res) => {
      setListTasksForSenior(res.data.allTasks || []);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке задач:", err);
    });
  }, [idApplication]);

  return (
    <Box mt={2}>
      {listTasksForSenior.length > 0 ? (
        <Box className="applications col" gap={2}>
          {listTasksForSenior.map((task) => (
            <Link
              to={`/task/${task._id}`}
              key={task._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <OneTask
                title={task.titleTask}
                desription={task.descriptionTask}
                status={task.status}
                deadline={task.deadline}
              />
            </Link>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary" mt={2}>
          Задачи пока не добавлены.
        </Typography>
      )}
    </Box>
  );
}

export default ListTasks;
