import { useState, useEffect } from 'react';
import axios from '../axios.js';
import '../styles/global.css';
import { useParams, useLocation } from 'react-router-dom';
import { Card, Typography, Box, Divider } from '@mui/material';
import EmployeeInfo from '../components/EmployeeInfo.js';

function ApplicationPage() {
  const { idApplication } = useParams();
  const location = useLocation();
  const { senior } = location.state || {};
  const [active, setActive] = useState(false);
  const [oneApplication, setOneApplication] = useState(null);

  useEffect(() => {
    axios.get(`/employee/application/one/${idApplication}`)
      .then((data) => {
        const app = data.data.oneApplication[0];
        setOneApplication(app);
        if (app.status === "Не просмотрено") {
          setActive(true);
        }
      })
      .catch((err) => {
        console.error('Ошибка при загрузке заявки:', err);
      });
  }, [idApplication]);

  if (!oneApplication) return <Typography>Загрузка...</Typography>;

  return (
    <Box
      className="col"
      sx={{
        gap: 3,
        padding: 3,
        maxWidth: 800,
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        className="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {oneApplication.title}
        </Typography>
        <Typography
          variant="body1"
          color={oneApplication.status === 'Не просмотрено' ? 'error' : 'primary'}
        >
          {oneApplication.status}
        </Typography>
      </Box>

      <Divider />

      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {oneApplication.description}
      </Typography>

      {oneApplication.responsible && (
        <Card
          sx={{
            padding: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            marginTop: 3,
          }}
        >
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
            Ответственный за выполнение:
          </Typography>
          <EmployeeInfo idEmployee={oneApplication.responsible} />
        </Card>
      )}
    </Box>
  );
}

export default ApplicationPage;
