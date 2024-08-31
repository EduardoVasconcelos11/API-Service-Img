import axios from 'axios';
import { AppDataSource } from '../data-source';
import { Measure } from '../models/Measure';
import { validateUploadData } from '../utils/validators';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export const uploadService = async (data: any) => {
  validateUploadData(data);

  const measureRepo = AppDataSource.getRepository(Measure);
  const existingMeasure = await measureRepo.findOneBy({
    customerCode: data.customer_code,
    measureType: data.measure_type
  });

  if (existingMeasure) {
    throw { statusCode: 409, code: "DOUBLE_REPORT", message: "Leitura do mês já realizada" };
  }

  // Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-pro",
});

  // const base64Image = Buffer.from(data.image).toString('base64');
  // const base64Image = Buffer.from(fs.readFileSync("../photos/teste.jpg")).toString("base64");
  // const base64Image = data.image;

  function fileToGenerativePart(path: any, mimeType: any) {
    return {
      inlineData: {
        data: path,
        mimeType
      },
    };
  }
  
  const prompt = "dados dessa imagem contador de agua";
  // Turn images to Part objects
  const filePart1 = fileToGenerativePart(data.image, "image/jpeg");
  const imageParts = [
    filePart1,
  ];


  const generatedContent = await model.generateContent([prompt, ...imageParts]);

  const measureValue = generatedContent.response.text();
  
  console.log(measureValue);

    // Gerar uma URL temporária para a imagem
    const imageUrl = await saveImageAndGenerateTempUrl(data.image);

    // Salvar os dados na tabela Measure
    const measure = new Measure();
    measure.customerCode = data.customer_code;
    measure.measureDatetime = new Date(data.measure_datetime);
    measure.measureType = data.measure_type;
    measure.imageUrl = imageUrl; // URL temporária da imagem
    measure.measureValue = measureValue;
  
    await measureRepo.save(measure);
  
    return {
      image_url: measure.imageUrl,
      measure_value: measure.measureValue,
      measure_uuid: measure.uuid
    };
};

async function saveImageAndGenerateTempUrl(base64Image: string) {
  const buffer = Buffer.from(base64Image, 'base64');
  const fileName = `${crypto.randomBytes(16).toString('hex')}.jpg`; // Gera um nome de arquivo aleatório
  const filePath = path.join(__dirname, '../temp', fileName); // Salva em um diretório temporário

  fs.writeFileSync(filePath, buffer);

  // Gera a URL temporária (ajuste conforme necessário para sua aplicação)
  const tempUrl = `http://localhost:80/temp/${fileName}`;

  // Configura o arquivo para ser deletado após 60 segundos (ou o tempo que desejar)
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Erro ao deletar o arquivo ${filePath}:`, err);
      } else {
        console.log(`Arquivo ${filePath} deletado após 60 segundos`);
      }
    });
  }, 60000); // 60 segundos

  return tempUrl;
}