import '../../styles/global.css';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  Input,
  FormHelperText,
  Alert,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchAuth, fetchUserMe } from '../../redux/slices/userSlices';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    setAuthError("");
    clearErrors();

    // Обработка admin как есть
    if (data.numberPassport === 'admin' && data.password === 'admin') {
      const fakeAdminToken = 'fake-admin-token';
      localStorage.setItem('token', fakeAdminToken);
      localStorage.setItem('role', 'admin');
      navigate('/user/register');
      return;
    }

    try {
      const authResponse = await dispatch(fetchAuth(data)).unwrap();

      if (authResponse.message) {
        // Если сервер вернул ошибку (например, неверный паспорт или пароль)
        setAuthError(authResponse.message);

        // Чтобы добавить ошибку прямо под полями формы (опционально)
        setError("numberPassport", {
          type: "manual",
          message: authResponse.message,
        });
        setError("password", {
          type: "manual",
          message: authResponse.message,
        });

        return;
      }

      if (authResponse.token) {
        localStorage.setItem("token", authResponse.token);
        await dispatch(fetchUserMe()).unwrap();
        navigate("/");
      } else {
        setAuthError("Неизвестная ошибка при входе");
      }
    } catch (err) {
      console.error("Ошибка при авторизации:", err);
      setAuthError("Ошибка сервера при авторизации");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>Авторизация</h2>
      <Card style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        <form
          className="col"
          onSubmit={handleSubmit(onSubmit)}
          style={{ gap: "20px", display: "flex", flexDirection: "column" }}
          onChange={() => {
            setAuthError("");
            clearErrors();
          }}
        >
          {authError && <Alert severity="error">{authError}</Alert>}

          <Input
            placeholder="Номер паспорта"
            {...register("numberPassport", {
              required: "Введите номер паспорта",
            })}
            error={!!errors.numberPassport}
          />
          {errors.numberPassport && (
            <FormHelperText error>{errors.numberPassport.message}</FormHelperText>
          )}

          <Input
            type="password"
            placeholder="Пароль"
            {...register("password", {
              required: "Введите пароль",
            })}
            error={!!errors.password}
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}

          <Button type="submit" variant="contained">
            Войти
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Auth;
