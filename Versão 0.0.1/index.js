import express from "express";
import 'dotenv/config';
import mysql from 'mysql2/promise';



const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306 ,     // Endereço do servidor
  user: 'root',           // Usuário do MySQL
  password: 'Reidosreis',           // Senha do usuário (deixe vazio se não tiver)
  database: 'clinicaPetshop' // Nome do banco de dados
});


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