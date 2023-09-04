import express, { Request, Response } from 'express';
import cors from 'cors';
import DatabaseConnection from './infra/database/database-connection';
import MysqlAdapter from './infra/database/mysqsl-adapter';
import Pessoa from './domain/pessoa';
const app = express();

app.use(express.json());
app.use(cors());

app.get('/contagem-pessoas', async (req: Request, res: Response) => {
  const database: DatabaseConnection = await MysqlAdapter.create();

  const pessoas = await database.query<{
    'COUNT(*)': number;
  }>('SELECT COUNT(*) FROM pessoas');

  await database.close();

  return res.send(pessoas);
});

app.get('/pessoas', async (req: Request, res: Response) => {
  const database: DatabaseConnection = await MysqlAdapter.create();

  const pessoas = await database.query<
    Array<{
      apelido: string;
      nome: string;
      nascimento: string;
      stack: string[];
    }>
  >('SELECT * FROM pessoas LIMIT 50');

  const pessoasToEntity = pessoas.map((pessoa) => {
    return Pessoa.create({
      apelido: pessoa.apelido,
      nome: pessoa.nome,
      nascimento: pessoa.nascimento,
      stack: pessoa.stack,
    });
  });
  await database.close();
  return res.send(pessoasToEntity);
});

app.post('/pessoas', async (req: Request, res: Response) => {
  const database: DatabaseConnection = await MysqlAdapter.create();
  const { apelido, nome, nascimento, stack } = req.body;

  const pessoa = Pessoa.create({ apelido, nome, nascimento, stack });

  await database.query<void>('INSERT INTO pessoas (apelido, nome, nascimento, stack) VALUES (?, ?, ?, ?)', [
    pessoa.apelido,
    pessoa.nome,
    pessoa.nascimento,
    pessoa.stack,
  ]);

  await database.close();
  return res.end();
});

const port = 80;

app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
