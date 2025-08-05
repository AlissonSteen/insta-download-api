import fastify from 'fastify';
import { fetchPostJson } from './src/index.js';

const app = fastify();
const PORT = process.env.PORT || 3000;

app.get('/', async (request, reply) => {
  reply.send('/download/?url=Link-do-video-instagram');
});

app.get('/download/', async (request, reply) => {
  const { url } = request.query;

  console.log("--> GET /download", url, new Date().toLocaleString());

  if (!url) {
    return reply.send({ error: 'forneça uma URL do instagram' });
  }

  try {
    const resultado = await fetchPostJson(url);
    reply.send({ ...resultado });
  } catch (error) {
    console.error("Erro ao processar:", error);
    reply.status(500).send({ error: 'Erro interno ao processar o link.' });
  }
});

const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: PORT });
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
