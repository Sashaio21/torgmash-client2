import '../styles/global.css'
import { Link } from 'react-router-dom';
import OneTask from './OneTask.js';
import axios from '../axios.js'
import { useEffect, useState } from 'react';
import OneTaskProgrammer from './OneTaskProgrammer.js';
import GanttChart from './GanttChart.js';


function ListTasksProgrammer({idApplication}) {
    const [listTasksForSenior, setListTasksForSenior] = useState([])

    useEffect(()=>{
        axios.get('/senior/programmer/all/task', 
            {"aplication" : idApplication}
        )
        .then((data)=>{
            console.log(data.data.allTasks)
            setListTasksForSenior(data.data.allTasks)
        })
    },[])

    const applications = [1,2,3,4,1]
    return(
        <div>
            <div className='applications col'>
               {listTasksForSenior.map((obj)=>
                    <Link  to={`/task/${obj._id}?title=${encodeURIComponent(obj.titleTask)}&description=${encodeURIComponent(obj.descriptionTask)}&status=${obj.status}&deadline=${obj.deadline}&idUser=${obj.executor}`}>
                        <OneTaskProgrammer
                            title={obj.titleTask}
                            desription={obj.descriptionTask}
                            status={obj.status}
                            deadline={obj.deadline}
                            idApplication={obj._id}
                            setListTasksForSenior={setListTasksForSenior}
                        /> 
                    </Link>            
                )}
            </div>

        </div>
    )
}
// to={`/application/page/${obj}`}
export default ListTasksProgrammer