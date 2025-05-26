import '../../styles/global.css';
import ApplicationComponentDeveloper from './ApplicationComponentDeveloper.js';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchAllApplication } from '../../redux/slices/employeeSlices.js';
import { setStatus } from '../../utilites/globalUtilites.js';
import { fetchUserMe } from '../../redux/slices/userSlices.js';
import { Box, Typography, CircularProgress } from '@mui/material';

function ListApplicationsDeveloper({ variant }) {
  const dispatch = useDispatch();
  const { applications, status, error } = useSelector((state) => state.applications);
  const { user, statusUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllApplication());
    dispatch(fetchUserMe());
  }, [dispatch]);

  const filteredApplications = applications?.applications?.filter((obj) => {
    if (variant === 0)
      return obj.status === 'Активно' && obj.responsible === user?.user?._id;
    if (variant === 1) return obj.status === 'Не просмотрено';
    return true; // variant === 2 — все заявки
  });

  if (status === 'loading' || statusUser === 'loading') {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !applications || !user) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">
          Произошла ошибка при загрузке заявок
        </Typography>
      </Box>
    );
  }

  if (!filteredApplications.length) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="text.secondary">
          Заявки отсутствуют
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {filteredApplications.map((obj) => (
        <Link
          key={obj._id}
          to={`/application/page/senior/${obj._id}?senior=true&newFunction=false`}
          style={{ textDecoration: 'none' }}
          onClick={() => setStatus(obj._id, obj.status, 'Просмотрено')}
        >
          <ApplicationComponentDeveloper
            title={obj.title}
            description={obj.description}
            urgency={obj.urgency}
            status={obj.status}
            created={obj.createdAt}
          />
        </Link>
      ))}
    </Box>
  );
}

export default ListApplicationsDeveloper;
