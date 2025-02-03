const express = require('express');
const router = express.Router();

let teams = []; // Lista temporal de equipos

// Crear equipo
router.post('/', (req, res) => {
    const { name, players } = req.body;
    const team = { id: teams.length + 1, name, players };
    teams.push(team);
    res.status(201).json({ message: 'Equipo creado exitosamente', team });
});

// Listar equipos
router.get('/', (req, res) => {
    res.json(teams);
});

module.exports = router;
