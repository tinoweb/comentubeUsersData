const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Rota para a API que retorna os dados
app.get('/api/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM usuarios ORDER BY data_cadastro DESC LIMIT 50');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json([]); // Retorna array vazio em caso de erro
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
