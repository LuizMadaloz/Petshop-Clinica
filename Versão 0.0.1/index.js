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


// Começa os Post

app.post("/relatorios", async (req  , res)=>{
  const opcaoSelecionada = req.body.tipo || ""; 
  const nomeFun = req.body.busca || "";
  const nCpf = req.body.buscaCpf || "";
  let listaFunc = [];

  if(opcaoSelecionada === "funcionarios"){
  try{
    const [resultados] = await connection.query("select * from funcionarios where nomeF like ? and cpf like ?",[`%${nomeFun}%`, `%${nCpf}%`]);
    console.log(resultados);
    listaFunc = resultados;
  }catch(err){
    console.log("ocorreu um erro",err);
};};

res.render("relatorios.ejs",{ funcionarios: listaFunc });

});

app.post("/vendas", async (req, res)=>{

  const nomeItem = req.body.nomeProduto || "";
  let listaItens =[];
  let devenda = 0;
  let produto = '';
try {
 const [resultado] = await connection.query("select * from cadastro_produtos where item like ?",[`%${nomeItem}%`]
);

  listaItens = resultado;
  console.log(listaItens);
}catch(e){
  console.log("ocorreu um erro", e)
}
if(req.body.nomeItem){
  produto = req.body.nomeItem;
  const quantidade = req.body.itemQuant;
  try{
    const[estoque] = await connection.query(`select quant_estoque from cadastro_produtos where item = '${produto}'`);
     const estoqueAtual = estoque[0].quant_estoque;
     console.log(estoque)
     console.log(estoqueAtual)
    if(quantidade <= estoqueAtual){
      devenda = 1;

    }else{
      devenda = 2;
      console.log("quantidade acima do estoque")
    }
  }catch(e){
    console.log("ocorreu um erro", e)
  }

};
  res.render('vendas.ejs', {lista: listaItens , autovenda: devenda, produto: produto});
});

app.post('servico', async (req , res) =>{
let servico = req.body.servicoex || "";
try{
  const[buscaServico] = await connection.query() //Não criei a table nessa versão ainda
}catch{

}
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});