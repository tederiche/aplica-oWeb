const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27017'; // Altere conforme necessário
const dbName = 'empresaTest2';

async function connectDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');
    
    const db = client.db(dbName);
    const concluidoCollection = db.collection('Concluido'); // Adicione esta linha
    const renegociarCollection = db.collection('Renegociar'); // Adicione esta linha

    return { db, concluidoCollection, renegociarCollection };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = { connectDatabase };
