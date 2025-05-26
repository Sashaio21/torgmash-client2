import '../../styles/global.css';
import { Fab, Box, Typography, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import ListTasks from '../../components/ListTasks';
import AddTaskModal from '../../components/AddTaskModal';
import { useEffect, useState } from 'react';
import axios from '../../axios';

function AddTask({ idApplication }) {
  const [isOpen, setOpen] = useState(false);
  const [allProgrammer, setAllProgrammer] = useState([]);

  useEffect(() => {
    axios.get('/senior/developer/programmer')
      .then((data) => {
        setAllProgrammer(data.data.allProgrammer);
      });
  }, []);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Задачи по заявке</Typography>
        <Button
  variant="contained"
  onClick={() => setOpen(true)}
>
  Добавить
</Button>

      </Box>

      <ListTasks idApplication={idApplication} />

      <AddTaskModal 
        isOpen={isOpen} 
        onClose={() => setOpen(false)} 
        idApplication={idApplication} 
        allProgrammer={allProgrammer} 
      />
    </Box>
  );
}

export default AddTask;
