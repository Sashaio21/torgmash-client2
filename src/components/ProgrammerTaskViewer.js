import React, { useEffect, useState } from 'react';
import axios from '../axios';
import GanttChart from './GanttChart'; // Импортируй свой компонент диаграммы Ганта

const ProgrammerTaskViewer = () => {
  const [programmers, setProgrammers] = useState([]);
  const [selectedProgrammerId, setSelectedProgrammerId] = useState('');
  const [listTasksForSenior, setListTasksForSenior] = useState([]);

  // Загрузка списка программистов
  useEffect(() => {
    axios
      .get('/senior/developer/programmer')
      .then((res) => {
        setProgrammers(res.data.allProgrammer);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке программистов:', err);
      });
  }, []);

  // Загрузка задач при выборе программиста
  useEffect(() => {
    if (selectedProgrammerId) {
      axios
        .get(`/senior/programmer/all/`)
        .then((res) => {
          setListTasksForSenior(res.data.allTasks);
        })
        .catch((err) => {
          console.error('Ошибка загрузки задач:', err);
        });
    }
  }, [selectedProgrammerId]);

  const handleSelectChange = (e) => {
    setSelectedProgrammerId(e.target.value);
  };

  return (
    <div>
      <h2>Выберите программиста</h2>
      <select value={selectedProgrammerId} onChange={handleSelectChange}>
        <option value="">-- Выберите --</option>
        {programmers.map((prog) => (
          <option key={prog._id} value={prog._id}>
            {prog.idEmployee.name}
          </option>
        ))}
      </select>

      {listTasksForSenior.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <GanttChart tasks={listTasksForSenior} />
        </div>
      )}
    </div>
  );
};

export default ProgrammerTaskViewer;
