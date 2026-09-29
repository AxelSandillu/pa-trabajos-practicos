import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:5000/api/tareas';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);

  // Cargar tareas al iniciar la aplicación (GET)
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error('Error al cargar tareas:', err));
  }, []);

  // Agregar tarea (POST)
  const agregarTarea = (nuevaTarea) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaTarea),
    })
      .then((res) => res.json())
      .then((data) => {
        setTareas([...tareas, data]);
      })
      .catch((err) => console.error('Error al agregar tarea:', err));
  };

  // Actualizar tarea (PUT)
  const actualizarTarea = (tareaActualizada) => {
    fetch(`${API_URL}/${tareaActualizada.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tareaActualizada),
    })
      .then(() => {
        setTareas(
          tareas.map((t) =>
            t.id === tareaActualizada.id ? tareaActualizada : t,
          ),
        );
        setTareaEditando(null);
      })
      .catch((err) => console.error('Error al actualizar tarea:', err));
  };

  // Eliminar tarea (DELETE)
  const eliminarTarea = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTareas(tareas.filter((t) => t.id !== id));
        if (tareaEditando && tareaEditando.id === id) {
          setTareaEditando(null);
        }
      })
      .catch((err) => console.error('Error al eliminar tarea:', err));
  };

  // Finalizar / Reabrir tarea (Actualiza el estado y hace PUT)
  const finalizarTarea = (id) => {
    const tareaAEditar = tareas.find((t) => t.id === id);
    if (!tareaAEditar) return;

    const nuevoEstado =
      tareaAEditar.estado === 'Finalizada' ? 'Pendiente' : 'Finalizada';
    const tareaModificada = { ...tareaAEditar, estado: nuevoEstado };

    actualizarTarea(tareaModificada);
  };

  return (
    <>
      <Header />
      <main className="gestor-container">
        <h1>Gestor de Proyectos y Tareas de Software</h1>

        <TaskForm
          onAddTask={agregarTarea}
          onUpdateTask={actualizarTarea}
          tareaEditando={tareaEditando}
          setTareaEditando={setTareaEditando}
        />

        <TaskList
          tareas={tareas}
          onDelete={eliminarTarea}
          onFinalize={finalizarTarea}
          onEdit={setTareaEditando}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
