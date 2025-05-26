import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Input,
  TextField,
  MenuItem,
  Alert,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../axios"; // адаптируй под свой путь

function AddJobTitle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get("/personnel/all/departaments") // предполагается, что есть эндпоинт для получения всех отделов
      .then((res) => setDepartments(res.data.departments))
      .catch((err) => {
        console.error("Ошибка загрузки отделов:", err);
        setError("Не удалось загрузить список отделов");
      });
  }, []);

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/personnel/add/jobtitle", data);

      if (response.data.message === "success") {
        setSuccess("Должность успешно добавлена");
        reset();
      } else {
        setError("Ошибка при добавлении должности");
      }
    } catch (err) {
      console.error("Ошибка при добавлении:", err);
      setError(err.response?.data?.error || "Ошибка сервера при добавлении");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>Добавление должности</h2>
      <Card style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Input
            placeholder="Название должности"
            {...register("nameJobTitle", {
              required: "Введите название должности",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              maxLength: {
                value: 100,
                message: "Максимум 100 символов",
              },
            })}
            error={!!errors.nameJobTitle}
          />
          {errors.nameJobTitle && (
            <FormHelperText error>{errors.nameJobTitle.message}</FormHelperText>
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

          <Button type="submit" variant="contained">
            Добавить должность
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddJobTitle;
