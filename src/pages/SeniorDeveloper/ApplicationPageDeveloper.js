import { useState, useEffect } from 'react';
import axios from '../../axios.js';
import '../../styles/global.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { setApplicant } from '../../utilites/globalUtilites.js';

function ApplicationPageDeveloper() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idApplication } = useParams();
  const location = useLocation();
  const user = useSelector(state => state.user);

  const [oneApplication, setOneApplication] = useState(null);

  useEffect(() => {
    axios.get(`/employee/application/one/${idApplication}`)
      .then((data) => {
        const app = data.data.oneApplication[0];
        setOneApplication(app);
      });
  }, [idApplication]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Не просмотрено':
        return 'warning';
      case 'Активно':
        return 'info';
      case 'Выполнено':
        return 'success';
      default:
        return 'default';
    }
  };

  if (!oneApplication) return <Typography>Загрузка...</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Card sx={{ width: '100%', maxWidth: 800, p: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight="bold">
              {oneApplication.title}
            </Typography>
            <Chip label={oneApplication.status} color={getStatusColor(oneApplication.status)} />
          </Box>

          <Box mb={1}>
            <Chip label={`Срочность: ${oneApplication.urgency}`} variant="outlined" />
          </Box>

          <Typography variant="body1" mb={3}>
            {oneApplication.description}
          </Typography>

          {oneApplication.status !== 'Активно' && (
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={() => setApplicant(
                  idApplication,
                  oneApplication.status,
                  "Активно",
                  navigate,
                  user.user.user._id
                )}
              >
                Перейти к выполнению
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ApplicationPageDeveloper;
