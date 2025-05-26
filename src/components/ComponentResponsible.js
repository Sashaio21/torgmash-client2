import '../styles/global.css'
import { Button } from '@mui/material'
import {Card} from '@mui/material'

function ComponentResponsible({name, contacts}){

    return (
        <Card 
        className='col'
        style={{
            padding: "10px",
            gap: "20px"
        }}
        >
            <h3>Ответственный за выполнение заявки</h3>
            <div 
                className='row'
                style={{
                    justifyContent: "space-between", 
                }}
            >
                <div>{name}</div>
                <div>+{contacts}</div>
            </div>
            </Card>
    )
}

export default ComponentResponsible