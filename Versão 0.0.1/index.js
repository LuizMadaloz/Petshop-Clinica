import express from "express";
import 'dotenv/config';
import mysql from 'mysql2/promise';



const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


async function testarConexao() {
  console.log('🔄 Tentando conectar ao banco de dados...');

  try {
    // 1. Abre a conexão usando as suas variáveis de ambiente
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    // 2. Executa uma query simples que funciona em qualquer banco MySQL
    const [linhas] = await connection.execute('SELECT NOW() AS hora_servidor');

    // 3. Se chegou aqui, deu certo!
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`📅 Hora atual no servidor MySQL: ${linhas[0].hora_servidor}`);

    // 4. Fecha a conexão
    await connection.end();

  } catch (erro) {
    // Se as credenciais estiverem erradas ou o banco estiver desligado, cai aqui
    console.error('❌ Erro ao conectar ao banco de dados:');
    console.error(erro.message);
  }
}

// Chamando a função para executar o teste
testarConexao();

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/servicos",(req, res )=>{
  res.render("servicos.ejs");
});

app.get("/relatorios", (req, res)=>{
  res.render("relatorios.ejs");
});

app.get("/vendas", (req, res)=>{
  res.render("vendas.ejs");
});

app.get("/clientes", (req, res)=>{
  res.render("clientes.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});