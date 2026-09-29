const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Memoria temporal del servidor (simulando la persistencia backend)
let tareas = [];

// Obtener tareas
app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

// Guardar tarea
app.post('/api/tareas', (req, res) => {
  const nuevaTarea = req.body;
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Actualizar tarea
app.put('/api/tareas/:id', (req, res) => {
  const { id } = req.params;
  tareas = tareas.map((t) => (t.id == id ? req.body : t));
  res.json({ message: 'Actualizada correctamente' });
});

// Eliminar tarea
app.delete('/api/tareas/:id', (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter((t) => t.id != id);
  res.json({ message: 'Eliminada correctamente' });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
