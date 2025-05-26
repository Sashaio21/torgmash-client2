import React from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Card, Button } from '@mui/material';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import ru from 'date-fns/locale/ru';
import axios from '../../axios';
import EmployeeInfo from '../../components/EmployeeInfo';

function Task() {
  const { idApplication } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Чтение query параметров
  const title = searchParams.get('title') || 'Без названия';
  const description = searchParams.get('description') || 'Нет описания';
  const status = searchParams.get('status') || 'неизвестен';
  const deadline = searchParams.get('deadline');
  const idUser = searchParams.get('idUser');

  const parsedDate = deadline ? parseISO(deadline) : null;
  const formattedDeadline = parsedDate && !isNaN(parsedDate)
    ? format(parsedDate, 'dd-MM-yyyy', { locale: ru })
    : 'Некорректная дата';

  const deleteTask = () => {
    axios.delete(`/senior/developer/task/${idApplication}`)
      .then(() => {
        navigate('/tasks');
      })
      .catch((err) => {
        console.error('Ошибка при удалении задачи:', err);
      });
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20 }}>
      <Link to="/tasks" style={{ textDecoration: 'none', color: '#1976d2', marginBottom: 20, display: 'inline-block' }}>
        ← К списку задач
      </Link>

      <Card style={{ padding: 20, marginBottom: 24 }}>
        <h2>{title}</h2>
        <p>{description}</p>

        <p><strong>Статус:</strong> {status}</p>
        <p><strong>Дедлайн:</strong> {formattedDeadline}</p>

        <Button variant="contained" color="primary" onClick={deleteTask}>
          Выполнить задачу
        </Button>
      </Card>

      {idUser && <EmployeeInfo idEmployee={idUser} />}
    </div>
  );
}

export default Task;
