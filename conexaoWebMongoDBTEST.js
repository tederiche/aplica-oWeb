const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(bodyParser.json());



// Configurando CORS para permitir solicitações de qualquer origem
app.use(cors({ origin: '*' }));

const publicFolderPath = path.join(__dirname, 'public'); //acessar a pasta public
app.use(express.static(publicFolderPath));

const client = new MongoClient('mongodb://localhost:27017/empresaTest');

async function fazerPesquisa(valorCid10, valorCidTipo, nomeArquivo, objetosPorArquivo = 2000) {
    try {
        await client.connect();
        const database = client.db();
        const colecoes = await database.listCollections().toArray();

        const consultas = colecoes.map(async colecaoInfo => {
            const colecaoNome = colecaoInfo.name;
            const colecao = database.collection(colecaoNome);

            const query = {
                CID_10: valorCid10,
                CID_TIPO: valorCidTipo,
            };

            const resultado = await colecao.find(query).toArray();
            return { colecao: colecaoNome, resultado };
        });

        const resultadosPorColecao = await Promise.all(consultas);

        const resultados = resultadosPorColecao.flatMap(item => item.resultado);

        let parteResultados = [];
        for (let i = 0; i < resultados.length; i++) {
            parteResultados.push(resultados[i]);

            if (parteResultados.length === objetosPorArquivo || i === resultados.length - 1) {
                const parteNomeArquivo = `${nomeArquivo}_parte${Math.ceil((i + 1) / objetosPorArquivo)}.json`;
                const caminhoCompleto = path.join(publicFolderPath, parteNomeArquivo);

                await fs.writeFile(caminhoCompleto, JSON.stringify(parteResultados, null, 2));
                console.log(`Parte de resultados salva no arquivo ${caminhoCompleto}`);
                parteResultados = [];
            }
        }
        console.log('Resultados salvos em partes.');

        return resultadosPorColecao;
    } finally {
        // Não feche a conexão aqui
    }
}
app.get('/valoresUnicosCID10.json', (req, res) => {
    const filePath = path.join(publicFolderPath, 'valoresUnicosCID10.json');
    res.sendFile(filePath);
});

app.get('/valoresUnicosCIDTIPO.json', (req, res) => {
    const filePath = path.join(publicFolderPath, 'valoresUnicosCIDTIPO.json');
    res.sendFile(filePath);
});

app.get('/pesquisa.html', (req, res) => {
    const filePath = path.join(publicFolderPath, 'pesquisa.html');
    res.sendFile(filePath);
});

app.post('/pesquisa', async (req, res) => {
    const { valorCid10, valorCidTipo, nomeArquivo } = req.body;

    if (!valorCid10 || !valorCidTipo || !nomeArquivo) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    try {
        const resultados = await fazerPesquisa(valorCid10, valorCidTipo, nomeArquivo);
        res.json({ resultados });
    } catch (error) {
        console.error('Erro ao executar pesquisa', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
