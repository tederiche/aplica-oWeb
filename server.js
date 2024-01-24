const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { salvarResposta } = require('./controller');
const cors = require('cors');

const app = express();
const port = 3002;

// Middleware para lidar com dados JSON
app.use(express.json());

// Middleware para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuração CORS permitindo solicitações de qualquer origem
app.use(cors());

// Rota para exibir o formulário de vendas
app.get('/vendas', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'vendas.html');
  res.sendFile(filePath);
});

// Rota para processar o envio do formulário
app.post('/processar-venda', async (req, res) => {
  const resposta = {
    data: req.body.data,
    nomeCliente: req.body.nomeCliente,
    cpfCliente: req.body.cpfCliente,
    cidades: req.body.cidades,
    operador: req.body.operador,
    produto: req.body.produto,
    obs: req.body.obs,
    contato: req.body.contato,
    observacao: req.body.observacao,
    fechamentoContrato: req.body.fechamentoContrato === 'true',
  };

  try {
    await salvarResposta(resposta, resposta.fechamentoContrato);

    // Aguarde 1 segundo antes de redirecionar
    setTimeout(() => {
      res.redirect('/vendas');
    }, 1000);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao enviar resposta.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
