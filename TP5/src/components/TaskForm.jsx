import { useState, useEffect } from 'react';

function TaskForm({
  onAddTask,
  onUpdateTask,
  tareaEditando,
  setTareaEditando,
}) {
  const initialState = {
    nombreProyecto: '',
    tipoActividad: 'Desarrollo',
    estado: 'Pendiente',
    resumen: '',
    descripcion: '',
    prioridad: 'Media',
    informador: '',
    personaAsignada: '',
    precondicion: '',
    fechaCreacion: new Date().toISOString().split('T')[0],
    fechaCierre: '',
    sprint: '',
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (tareaEditando) {
      setFormData(tareaEditando);
    } else {
      setFormData(initialState);
    }
  }, [tareaEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombreProyecto.trim()) return;

    if (tareaEditando) {
      onUpdateTask(formData);
    } else {
      onAddTask({ ...formData, id: Date.now() });
    }

    setFormData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gestor-form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h3>
        {tareaEditando
          ? 'Editar Tarea / Proyecto'
          : 'Nueva Tarea / Proyecto de Software'}
      </h3>

      <input
        type="text"
        name="nombreProyecto"
        placeholder="Nombre del Proyecto"
        value={formData.nombreProyecto}
        onChange={handleChange}
        required
      />

      <label>Tipo de Actividad:</label>
      <select
        name="tipoActividad"
        value={formData.tipoActividad}
        onChange={handleChange}
      >
        <option value="Desarrollo">Desarrollo</option>
        <option value="Bug">Bug / Error</option>
        <option value="Pruebas">Pruebas / QA</option>
        <option value="Diseño">Diseño</option>
      </select>

      <label>Estado:</label>
      <select name="estado" value={formData.estado} onChange={handleChange}>
        <option value="Pendiente">Pendiente</option>
        <option value="En Proceso">En Proceso</option>
        <option value="Finalizada">Finalizada</option>
      </select>

      <input
        type="text"
        name="resumen"
        placeholder="Resumen"
        value={formData.resumen}
        onChange={handleChange}
      />

      <textarea
        name="descripcion"
        placeholder="Descripción detallada"
        value={formData.descripcion}
        onChange={handleChange}
        rows="3"
      />

      <label>Prioridad:</label>
      <select
        name="prioridad"
        value={formData.prioridad}
        onChange={handleChange}
      >
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
        <option value="Crítica">Crítica</option>
      </select>

      <input
        type="text"
        name="informador"
        placeholder="Informador (Quién reporta)"
        value={formData.informador}
        onChange={handleChange}
      />
      <input
        type="text"
        name="personaAsignada"
        placeholder="Persona asignada"
        value={formData.personaAsignada}
        onChange={handleChange}
      />
      <input
        type="text"
        name="precondicion"
        placeholder="Precondición"
        value={formData.precondicion}
        onChange={handleChange}
      />

      <label>Fecha de Creación:</label>
      <input
        type="date"
        name="fechaCreacion"
        value={formData.fechaCreacion}
        onChange={handleChange}
      />

      <label>Fecha de Cierre estimada:</label>
      <input
        type="date"
        name="fechaCierre"
        value={formData.fechaCierre}
        onChange={handleChange}
      />

      <input
        type="text"
        name="sprint"
        placeholder="Sprint (Ej: Sprint 1)"
        value={formData.sprint}
        onChange={handleChange}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="submit"
          className="Button_Agregar"
          style={{ flex: 1, padding: '10px' }}
        >
          {tareaEditando ? 'Actualizar Tarea' : 'Guardar Tarea'}
        </button>
        {tareaEditando && (
          <button
            type="button"
            onClick={() => setTareaEditando(null)}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
