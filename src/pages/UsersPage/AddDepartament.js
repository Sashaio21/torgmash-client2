import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Input,
  Alert,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import axios from "../../axios";

function AddDepartment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/personnel/add/departament", data);

      if (response.data.message === "success") {
        setSuccess("Отдел успешно добавлен");
        reset();
      } else {
        setError("Ошибка при добавлении отдела");
      }
    } catch (err) {
      console.error("Ошибка сервера:", err);
      setError(err.response?.data?.error || "Ошибка сервера при добавлении");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>Добавление отдела</h2>
      <Card style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Input
            placeholder="Название отдела"
            {...register("nameDepartment", {
              required: "Введите название отдела",
              minLength: {
                value: 2,
                message: "Название должно содержать минимум 2 символа",
              },
              maxLength: {
                value: 50,
                message: "Название не должно превышать 50 символов",
              },
            })}
            error={!!errors.nameDepartment}
          />
          {errors.nameDepartment && (
            <FormHelperText error>{errors.nameDepartment.message}</FormHelperText>
          )}

          <Button type="submit" variant="contained">
            Добавить отдел
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddDepartment;
