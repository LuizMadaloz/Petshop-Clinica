import express from "express";
import 'dotenv/config';
import mysql from 'mysql2/promise';



const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


async function testarConexao() {
  console.log('🔄 Tentando conectar ao banco de dados...');

  try {
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    
    const [linhas] = await connection.execute('SELECT NOW() AS hora_servidor');

    
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`📅 Hora atual no servidor MySQL: ${linhas[0].hora_servidor}`);

    
    await connection.end();

  } catch (erro) {
    
    console.error('❌ Erro ao conectar ao banco de dados:');
    console.error(erro.message);
  }
};

async function funcionarios() {
  
  try{
    const [funcionarios] = await connection.query('select * from funcionarios');
    console.log(funcionarios);

  }catch(erro){
    console.log("ocorreu um erro",erro);

  }
};



testarConexao();
funcionarios();

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