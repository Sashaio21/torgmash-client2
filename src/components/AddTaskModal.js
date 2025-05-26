import { Modal, Card, Button, Input, Select, MenuItem, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "../axios";
import ProgrammerTaskViewer from "./ProgrammerTaskViewer";
import GanttChart from "./GanttChart";

function AddTaskModal({ isOpen, onClose, allProgrammer, idApplication }) {
  const { control, handleSubmit, register, formState: { errors } } = useForm();
  const [date, setDate] = useState(null);
  const [value, setValue] = useState()
  const [programmer, setProgrammer] = useState(false)
  const [tasks, setTasks] = useState(false)

  const listProgrammer = ["Dima", "Sascha", "Igor"];

  const onSubmit = (data) => {
    // Преобразуем дату в нужный формат
    const formattedData = {
        ...data,
        deadline: formatDate(data.deadline),
    };

    axios.post(`/senior/developer/task/${idApplication}`, formattedData)

    onClose()
  };

  const test = () =>{
    console.log(allProgrammer)
  }





  // Функция для преобразования даты в формат YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    return date.toISOString().split('T')[0]; // Обрезаем строку до нужного формата
  };

  return (
    <Modal
        open={isOpen}
        onClose={onClose}
        style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "60%",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            maxHeight: "80vh", // Ограничиваем максимальную высоту окна
            overflowY: "auto"  // Включаем вертикальную прокрутку при необходимости
        }}
    >
      <Card style={{ padding: "10px" }}>
        <form
          className="col"
          onSubmit={handleSubmit(onSubmit)}
          style={{ gap: "20px" }}
        >
          <h3>Новая задача</h3>

          {/* Заголовок */}
          <Input
            {...register("titleTask", { required: "Заголовок обязателен" })}
            placeholder="Заголовок"
          />

          {/* Описание */}
          <textarea
            placeholder="Опишите проблему"
            rows={5}
            {...register("descriptionTask", { required: "Описание обязательно" })}
          />

          {/* Выбор программиста */}
          <Select
            {...register("executor")}
            defaultValue="" // Укажите начальное значение, если нужно
            onChange={(e) => {
            const selectedId = e.target.value;
            setValue("executor", selectedId); // если хотите вручную обновить
            console.log("Выбрано:", selectedId);

            axios.get(`/senior/programmer/all/task/${selectedId}`)
            .then((res) => {
              console.log(res.data.allTasks)
              setTasks(res.data.allTasks)
            })

            // можно вызвать axios-запрос здесь
          }}
          >
            {allProgrammer && allProgrammer.length > 0 ? (
              allProgrammer.map((obj, index) => (
                <MenuItem 
                  key={obj.idEmployee._id || `${obj.idEmployee.name}-${index}`} 
                  value={obj.idEmployee._id} // Используем _id как value
                >
                  {obj.idEmployee.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem key={-1} value="">
                Пусто
              </MenuItem>
            )}
          </Select>


          {/* DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="deadline"
              control={control}
              rules={{ required: "Выберите дату" }}
              render={({ field }) => (
                <DatePicker
                  label="Выберите дату"
                  value={field.value}
                  onChange={field.onChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )}
            />
          </LocalizationProvider>

          {/* Ошибка для даты */}
          {errors.deadline && (
            <p style={{ color: "red" }}>{errors.deadline.message}</p>
          )}
          {tasks !== false && <GanttChart tasks={tasks} width="90%" height={200}/>}
          <br></br>
        <br></br>
        <br></br>
        <br></br>

          {/* Кнопки */}
          <div className="row">
            <Button onClick={onClose}>Закрыть</Button>
            <Button type="submit">Добавить</Button>
            {/* <Button onClick={()=>{test()}}>Хуй</Button> */}
          </div>
        </form>
        
        
      </Card>
    </Modal>
  );
}

export default AddTaskModal;
