function TaskList({ tareas, onDelete, onFinalize, onEdit }) {
  if (tareas.length === 0) {
    return (
      <p
        style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text)' }}
      >
        No hay tareas cargadas todavía.
      </p>
    );
  }

  return (
    <div style={{ maxWidth: '650px', width: '100%', margin: '0 auto' }}>
      <h3
        style={{
          textAlign: 'left',
          marginBottom: '16px',
          color: 'var(--text-h)',
        }}
      >
        Listado de Tareas
      </h3>
      <ul className="gestor-lista">
        {tareas.map((t) => (
          <li
            key={t.id}
            style={{
              borderLeft:
                t.estado === 'Finalizada'
                  ? '4px solid #4CAF50'
                  : '4px solid #a700fbaa',
              background:
                t.estado === 'Finalizada'
                  ? 'rgba(76, 175, 80, 0.03)'
                  : 'var(--bg)',
            }}
          >
            <h4>
              {t.nombreProyecto}
              <span
                style={{
                  fontSize: '0.75em',
                  fontWeight: 'normal',
                  color: 'var(--text)',
                }}
              >
                ({t.tipoActividad})
              </span>
            </h4>

            <p>
              <strong>Resumen:</strong> {t.resumen || 'Sin resumen'}
            </p>
            <p>
              <strong>Descripción:</strong> {t.descripcion || 'Sin descripción'}
            </p>
            <p>
              <strong>Prioridad:</strong> {t.prioridad} |{' '}
              <strong>Estado:</strong> {t.estado}
            </p>
            <p>
              <strong>Informador:</strong> {t.informador || 'N/D'} |{' '}
              <strong>Asignado:</strong> {t.personaAsignada || 'N/D'}
            </p>
            <p>
              <strong>Sprint:</strong> {t.sprint || 'N/D'} |{' '}
              <strong>Cierre:</strong> {t.fechaCierre || 'Sin fecha'}
            </p>

            <div className="acciones-tarjeta">
              <button
                onClick={() => onFinalize(t.id)}
                className="Button_Agregar"
                style={{ minWidth: 'auto' }}
              >
                {t.estado === 'Finalizada' ? 'Reabrir' : 'Finalizar'}
              </button>

              <button
                onClick={() => onEdit(t)}
                className="Button_Editar"
                style={{ minWidth: 'auto' }}
              >
                Editar
              </button>

              <button
                onClick={() => onDelete(t.id)}
                className="Button_Eliminar"
                style={{ minWidth: 'auto' }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
