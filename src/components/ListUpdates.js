import '../styles/global.css';
import { Card, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from '../axios.js';

function ListUpdates({ variant }) {
  const [listUpdateForEmployee, setListUpdateForEmployee] = useState(null);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    axios.post('/senior/developer/get/update', { developer: false })
      .then((data) => {
        setListUpdateForEmployee(data.data.allProgrammer);
      })
      .catch(() => setListUpdateForEmployee([]));
  }, []);

  if (!listUpdateForEmployee) {
    return <Typography align="center" sx={{ mt: 4 }}>Загрузка...</Typography>;
  }

  if (listUpdateForEmployee.length === 0) {
    return <Typography align="center" sx={{ mt: 4 }}>Обновлений пока нет</Typography>;
  }

  return (
    <Box
      className="col"
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 700,
        margin: '0 auto',
        padding: 2,
      }}
    >
      {listUpdateForEmployee.map((obj) => (
        <Card
          key={obj._id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: '#fefefe',
            '&:hover': { boxShadow: 4 },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '80%' }}>
            <Typography variant="h6" fontWeight="medium" noWrap>
              {obj.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'normal' }}>
              {obj.description}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ alignSelf: 'flex-start', minWidth: 100, textAlign: 'right' }}
          >
            {formatDate(obj.createdAt)}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}

export default ListUpdates;
