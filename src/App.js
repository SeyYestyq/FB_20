import React, { useState } from 'react'; // 1. Импортируем useState
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Counter from './components/Counter';
import RegistrationForm from './components/RegistrationForm';
import ColorPicker from './components/ColorPicker';
import QuickActions from './components/QuickActions';

function App() {
  // 2. Инициализируем состояние с массивом технологий
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'изучил как создавать компоненты в React',
      status: 'completed'
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'нужно изучить синтаксис JSX',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов (useState, useEffect)',
      status: 'not-started'
    }
  ]);

  // Состояние для активного фильтра
  const [activeFilter, setActiveFilter] = useState('all');

  // 3. Функция для изменения статуса
  const handleStatusChange = (id) => {
    setTechnologies(prevTechs => prevTechs.map(tech => {
      if (tech.id === id) {
        // Логика циклического переключения
        let nextStatus;
        if (tech.status === 'not-started') nextStatus = 'in-progress';
        else if (tech.status === 'in-progress') nextStatus = 'completed';
        else nextStatus = 'not-started';

        return { ...tech, status: nextStatus };
      }
      return tech;
    }));
  };

  // Функции для быстрых действий
  const handleMarkAllCompleted = () => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const handleResetAll = () => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const handleRandomNext = () => {
    // Находим все не завершенные технологии
    const notCompleted = technologies.filter(
      tech => tech.status !== 'completed'
    );

    if (notCompleted.length === 0) {
      alert('Все технологии уже изучены! 🎉');
      return;
    }

    // Выбираем случайную технологию
    const randomTech = notCompleted[Math.floor(Math.random() * notCompleted.length)];

    alert(`Следующая технология для изучения: ${randomTech.title}`);
  };

  // Функция фильтрации технологий
  const getFilteredTechnologies = () => {
    if (activeFilter === 'all') return technologies;
    return technologies.filter(tech => tech.status === activeFilter);
  };

  const filteredTechnologies = getFilteredTechnologies();

  return (
    <div className="App">
      <Counter />
      <RegistrationForm/>
      <ColorPicker/>
      <h1>Трекер изучения React</h1>

      {/* Передаем актуальное состояние в хедер */}
      <ProgressHeader items={technologies} />

      {/* Компонент быстрых действий */}
      <QuickActions
        onMarkAllCompleted={handleMarkAllCompleted}
        onResetAll={handleResetAll}
        onRandomNext={handleRandomNext}
      />

      {/* Фильтры */}
      <div className="filters">
        <h3>Фильтр по статусу:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Все ({technologies.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'not-started' ? 'active' : ''}`}
            onClick={() => setActiveFilter('not-started')}
          >
            Не начаты ({technologies.filter(t => t.status === 'not-started').length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-progress')}
          >
            В процессе ({technologies.filter(t => t.status === 'in-progress').length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Выполнены ({technologies.filter(t => t.status === 'completed').length})
          </button>
        </div>
      </div>

      <div className="tech-list">
        {filteredTechnologies.map((tech) => (
          <TechnologyCard
            key={tech.id}
            // Передаем весь объект tech, или отдельные пропсы
            title={tech.title}
            description={tech.description}
            status={tech.status}
            // 4. Передаем функцию обратного вызова
            onStatusChange={() => handleStatusChange(tech.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;