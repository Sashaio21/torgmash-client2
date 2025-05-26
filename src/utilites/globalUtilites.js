import { useSelector, useDispatch } from 'react-redux';
import { fetchAllApplication } from '../redux/slices/employeeSlices.js';
import axios from '../axios.js'



const setStatus = (idApplication, currentStatus,status, navigate = false, responsible = false) => {

    if (currentStatus != "Не просмотрено") {
        return null
    } else {
        axios.patch(`/senior/developer/application/status/${idApplication}`, {
            "status" : status,
            "responsible" : responsible
        }).then(()=>{
            console.log("успех")
        })
        if (navigate) {
            navigate('/')
        }
    }
}


const setApplicant = (idApplication, currentStatus,status, navigate = false, responsible = false) => {

    axios.patch(`/senior/developer/application/status/${idApplication}`, {
        "status" : status,
        "responsible" : responsible
    }).then(()=>{
        console.log("успех")
    })
    if (navigate) {
        navigate('/')
    }

}


export { setStatus, setApplicant}