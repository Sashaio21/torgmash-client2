import '../../styles/global.css';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, MenuItem, Typography, Box, TextareaAutosize } from "@mui/material";
import { fetchSendApplication } from '../../redux/slices/employeeSlices';
import { useDispatch } from 'react-redux';

function SendApplication() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatchApplications = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatchApplications(fetchSendApplication(data));
    console.log("Форма отправлена:", data);
    navigate('/');
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Отправка заявки
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Input
            placeholder="Кратко опишите проблему"
            fullWidth
            disableUnderline
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              padding: '10px 12px',
              fontSize: '16px',
              '&:focus-within': { borderColor: '#1976d2' }
            }}
            {...register("title", { required: "Заголовок обязателен" })}
          />
          {errors.title && (
            <Typography variant="caption" color="error" sx={{ mt: -2, mb: 1 }}>
              {errors.title.message}
            </Typography>
          )}

          <TextareaAutosize
            minRows={5}
            placeholder="Опишите проблему"
            style={{
              width: '100%',
              padding: 12,
              fontSize: 16,
              borderRadius: 6,
              border: '1px solid #ccc',
              resize: 'vertical',
              fontFamily: 'Roboto, sans-serif',
              boxSizing: 'border-box',
              outline: 'none',
            }}
            {...register("description", { required: "Описание обязательно" })}
          />
          {errors.description && (
            <Typography variant="caption" color="error" sx={{ mt: -2, mb: 1 }}>
              {errors.description.message}
            </Typography>
          )}

          <Select
            defaultValue="Не срочно"
            {...register("urgency", { required: "Выберите уровень срочности" })}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              fontSize: '16px',
              paddingLeft: 1,
              '& .MuiSelect-select': {
                paddingY: 1.2,
              },
              '&:focus': {
                borderColor: '#1976d2',
              },
            }}
            fullWidth
          >
            <MenuItem value="Критично">Критично</MenuItem>
            <MenuItem value="Срочно">Срочно</MenuItem>
            <MenuItem value="Средне">Средне</MenuItem>
            <MenuItem value="Не срочно">Не срочно</MenuItem>
          </Select>
          {errors.urgency && (
            <Typography variant="caption" color="error" sx={{ mt: -2, mb: 1 }}>
              {errors.urgency.message}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/')}
              sx={{ minWidth: 120 }}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ minWidth: 120 }}
            >
              Отправить
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default SendApplication;
