import '../../styles/global.css'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button,Input, Select, MenuItem } from "@mui/material";
import { fetchSendApplication } from '../../redux/slices/employeeSlices';
import { useDispatch } from 'react-redux';


function AddUpdateFinction(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatchApplications = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        dispatchApplications(fetchSendApplication(data))
        console.log("Форма отправлена:", data);
        navigate('/')
    };


    return (
        <div>
            <h2 style={{marginBottom: "20px"}}>Отправка заявки</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div 
                className='col'
                style={{
                    gap: "20px"
                }}
            >
                <Input
                    placeholder='Кратко опишите проблему'
                    {...register("title", { required: "Заголовок обязателен" })}
                />
                {errors.title && <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>{errors.title.message}</p>}
                 <textarea
                    placeholder="Опишите проблему"
                    rows={5} // 5 строк
                    {...register("description", { required: "Описание обязательно" })}
                />
                {errors.description && <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>{errors.description.message}</p>}
                <Select
                    defaultValue={"Не срочно"}
                    {...register("urgency", { required: "Заголовок обязателен" })}
                >
                    <MenuItem value="Срочно">Срочно</MenuItem>
                    <MenuItem value="Не срочно">Не срочно</MenuItem>
                </Select>
                <div 
                    className='row'
                    style={{gap: "20px"}}
                >
                    <Button >Отмена</Button>
                    <Button type="onsubmit">Отправить</Button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default AddUpdateFinction