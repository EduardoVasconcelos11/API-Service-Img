import "reflect-metadata";
import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import path from 'path';
import fs from 'fs';

dotenv.config();

import { AppDataSource } from './data-source';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Adicionar a rota para servir arquivos da pasta "temp"
app.get('/temp/:filename', (req, res) => {
  const filename = req.params.filename;
  const tempDir = path.join(__dirname, 'temp');
  const filePath = path.join(tempDir, filename);

  // Verificar se o arquivo existe
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Arquivo não encontrado');
  }
});

// Inicializar o banco de dados e iniciar o servidor
AppDataSource.initialize().then(() => {
  app.use('/api', routes);
  
  const PORT = process.env.PORT || 80;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log(error));
