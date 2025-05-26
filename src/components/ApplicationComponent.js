import '../styles/global.css';
import { Button, Card, Box, Typography } from '@mui/material';

function ApplicationComponent({ title, description, urgency, status, id }) {
  return (
    <Card
      elevation={3}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#fafafa',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Срочность: <strong>{urgency}</strong>
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Typography
          variant="body1"
          color={status === 'завершена' ? 'green' : 'orange'}
          sx={{ marginBottom: 1 }}
        >
          Статус: {status}
        </Typography>
        <Button variant="contained" color="error">
          Удалить
        </Button>
      </Box>
    </Card>
  );
}

export default ApplicationComponent;
