const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { fazerPesquisa } = require('./conexaoWebMongoDBTEST.js'); // Usando caminho relativo
const { salvarResposta } = require('./server.js'); // Usando caminho relativo

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Mova isso para cima das suas rotas

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));



// Rota do primeiro arquivo
app.get('/pesquisa.html', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'pesquisa.html');
    res.sendFile(filePath);
});

// Rota do segundo arquivo
app.get('/vendas.html', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'vendas.html');
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
