import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Input,
  FormHelperText,
  Alert,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "../../axios";

function Register() {
  const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm({ mode: "onChange" });

  const password = watch("password");


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [departments, setDepartments] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const selectedDepartment = watch("department"); // следим за выбором отдела

  // Получаем список отделов
  useEffect(() => {
    axios
      .get("/personnel/all/departaments")
      .then((res) => setDepartments(res.data.departments))
      .catch((err) => {
        console.error("Ошибка при получении отделов:", err);
        setError("Не удалось загрузить список отделов");
      });
  }, []);

  // При изменении отдела — загружаем должности
  useEffect(() => {
  if (selectedDepartment) {
    axios
      .get(`/personnel/all/jobtitle/${selectedDepartment}`)
      .then((res) => setJobTitles(res.data.departments || [])) // ✅ теперь берём из "departments"
      .catch((err) => {
        console.error("Ошибка при получении должностей:", err);
        setJobTitles([]);
      });
  } else {
    setJobTitles([]);
  }
}, [selectedDepartment]);


  // Отправка формы
  const onSubmit = async (formData) => {
    setError("");
    setSuccess("");
    console.log(formData)

    try {
      const response = await axios.post("/user/registry", formData);

      if (response.data.registr) {
        setSuccess("Пользователь успешно зарегистрирован");
      } else {
        setError(response.data.message || "Ошибка регистрации");
      }
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      setError("Ошибка сервера при регистрации");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>Регистрация пользователя</h2>
      <Card style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Input
            placeholder="Номер паспорта"
            {...register("numberPassport", { required: "Введите номер паспорта" })}
            error={!!errors.numberPassport}
          />
          {errors.numberPassport && (
            <FormHelperText error>{errors.numberPassport.message}</FormHelperText>
          )}

          <Input
            placeholder="ФИО"
            {...register("name", { required: "Введите ФИО" })}
            error={!!errors.name}
          />
          {errors.name && (
            <FormHelperText error>{errors.name.message}</FormHelperText>
          )}

          <TextField
            label="Дата рождения"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("dob", { required: "Укажите дату рождения" })}
            error={!!errors.dob}
          />
          {errors.dob && (
            <FormHelperText error>{errors.dob.message}</FormHelperText>
          )}

          <Input
            placeholder="Контакты"
            type="number"
            {...register("contacts", { required: "Введите контакты" })}
            error={!!errors.contacts}
          />
          {errors.contacts && (
            <FormHelperText error>{errors.contacts.message}</FormHelperText>
          )}

          <TextField
            select
            label="Отдел"
            defaultValue=""
            {...register("department", { required: "Выберите отдел" })}
            error={!!errors.department}
          >
            {departments.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.nameDepartment}
              </MenuItem>
            ))}
          </TextField>
          {errors.department && (
            <FormHelperText error>{errors.department.message}</FormHelperText>
          )}

          <TextField
            select
            label="Должность"
            defaultValue=""
            {...register("jobTitle", { required: "Выберите должность" })}
            error={!!errors.jobTitle}
            disabled={!selectedDepartment}
          >
            {jobTitles.length > 0 ? (
              jobTitles.map((job) => (
                <MenuItem key={job._id} value={job._id}>
                  {job.nameJobTitle}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Нет доступных должностей</MenuItem>
            )}
          </TextField>
          {errors.jobTitle && (
            <FormHelperText error>{errors.jobTitle.message}</FormHelperText>
          )}

          <TextField
            label="Дата приёма на работу"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("dateEmployment", { required: "Укажите дату приёма на работу" })}
            error={!!errors.dateEmployment}
          />

          {errors.dateEmployment && (
            <FormHelperText error>{errors.dateEmployment.message}</FormHelperText>
          )}

          <Input
            type="password"
            placeholder="Пароль"
            {...register("password", { required: "Введите пароль" })}
            error={!!errors.password}
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}

          <Input
            type="password"
            placeholder="Подтвердите пароль"
            {...register("confirmPassword", {
              required: "Подтвердите пароль",
              validate: (value) =>
                value === password || "Пароли не совпадают",
            })}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <FormHelperText error>
              {errors.confirmPassword.message}
            </FormHelperText>
          )}


          <Button type="submit" variant="contained">
            Зарегистрировать
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Register;
