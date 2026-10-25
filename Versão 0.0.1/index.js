import express from "express";






const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



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