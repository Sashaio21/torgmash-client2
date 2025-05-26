import '../../styles/global.css'
import { useForm } from "react-hook-form";
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { Button,Input, Select, MenuItem } from "@mui/material";
import { fetchSendApplication } from '../../redux/slices/employeeSlices';
import { useDispatch } from 'react-redux';



function CreateNewFunction(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatchApplications = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        axios.post("/senior/developer/add/function", data)
        .then(()=>{
            console.log("успех")
            navigate('/');
        })
    };


    return (
        <div>
            <h2 style={{marginBottom: "20px"}}>Новая функция</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div 
                className='col'
                style={{
                    gap: "20px"
                }}
            >
                <Input
                    placeholder='Кратко опишите идею'
                    {...register("title", { required: "Заголовок обязателен" })}
                />
                {errors.title && <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>{errors.title.message}</p>}
                 <textarea
                    placeholder="Опишите суть функии"
                    rows={5} // 5 строк
                    {...register("description", { required: "Описание обязательно" })}
                />
                {errors.description && <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>{errors.description.message}</p>}
                <div 
                    className='row'
                    style={{gap: "20px"}}
                >
                    <Button variant="contained" color="error" >Отмена</Button>
                    <Button type="onsubmit" variant="contained">Отправить</Button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default CreateNewFunction