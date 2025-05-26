import '../../styles/global.css';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

function ApplicationComponentDeveloper({ title, description, urgency, status, created }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Высокая':
        return 'error';
      case 'Средняя':
        return 'warning';
      case 'Низкая':
        return 'success';
      default:
        return 'default';
    }
  };

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

  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
      <CardContent>
        {created && (
          <Typography variant="caption" color="text.secondary">
            {formatDate(created)}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Chip label={status} color={getStatusColor(status)} />
        </Box>

        <Typography variant="body2" mb={2}>
          {description}
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          <Chip label={`Срочность: ${urgency}`} color={getUrgencyColor(urgency)} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ApplicationComponentDeveloper;
