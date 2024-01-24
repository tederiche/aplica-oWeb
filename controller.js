const { connectDatabase } = require('./db');

async function salvarResposta(resposta, fechamentoContrato) {
  const { db, concluidoCollection, renegociarCollection } = await connectDatabase();
  try {
    const collectionName = fechamentoContrato ? 'Concluido' : 'Renegociar';
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(resposta);
    console.log('Resposta salva com sucesso. ID:', result.insertedId);
  } catch (error) {
    console.error('Erro ao salvar resposta:', error);
    throw error;
  } finally {
    await db.client.close();
  }
}

module.exports = { salvarResposta };
