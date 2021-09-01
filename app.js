
// importação dos modulos para o desenvolvimento do servidor
const express = require("express");

// Ajuda a receptionar os dados em formato JSON que virão do front para 
// serem manipulados no servidor.
const bodyParser = require("body-parser");

//importar o modulo do mongoose
const mongoose = require("mongoose");


const cors = require("cors");

const config = {
    origin: "*",
    optionsSuccessStatus: 200
}




//url de conexao com o banco de dados
const url = "mongodb+srv://gu_borges:gust@vo123@cluster0.rjt5b.mongodb.net/sustentabilidadeeletronica?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//vamos criar a estrutura da tabela de administrador
const tbadm = mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    idade: String,
    senha: String
});


//vamos criar a estrutura da tabela de colaboradores
const tbcolab = mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    idade: String,
    senha: String
});

//vamos criar a estrutura da tabela de noticias
const tbnoticia = mongoose.Schema({
    titulo: String,
    datadepublicacao: String,
    texto: String,
    autor: String,
    foto1: String,
    foto2: String
});

//vamos criar a estrutura da tabela de contato
const tbcontato = mongoose.Schema({
    nomecliente: String,
    email: String,
    telefone: String,
    assunto: String,
    mensagem: String
});

//Criar efetivamente as 2 tabelas no banco
const Administrador = mongoose.model("adm", tbadm);

const Colaborador = mongoose.model("colaborador", tbcolab);

const Noticia = mongoose.model("noticia", tbnoticia);

const Contato = mongoose.model("contato", tbcontato);

// Vamos usar o servidor express com app
const app = express();

app.use(cors());

// registrar o uso do bodyParser
app.use(bodyParser.json());

// criação da rota raiz("/") vamos apresentar dados sobre a loja
app.get("/", cors(config), (req, res) => {
    res.status(200).send({
        titulo: "Lixo Eletrônico",
        texto: "A contaminação do solo e dos rios também é agravada pelo descarte irregular de lixo eletrônico. “Quando você descarta um celular no lixo, é descartado plástico que vai para o meio ambiente e circuitos com metais que acabam contaminando o solo do lixão”, aponta o professor. “Temos uma grande quantidade deles nos rios",
        imagens: [
            "http://www.web.ssgrama.sp.gov.br/images/noticias/466/1497332703.jpg",
            "https://www.fragmaq.com.br/wp-content/uploads/2015/05/1-lixo-eletronico.jpg"
        ]
    });
});




// --------------------------------------------------------------------------------------------------------------
//                                    ROTAS NOTICIAS
// --------------------------------------------------------------------------------------------------------------



//Vamos fazer um refactor(refatorar), ou seja, modificar
//o código para uma nova execução. É uma atualização do código
//rota para exibir todas as noticias cadastrados no banco de dados
app.get("/noticias", cors(config), (req, res) => {
    Noticia.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});

//localizar uma noticia por seu id
app.get("/noticias/:id", cors(config), (req, res) => {
    Noticia.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});




//rota para cadastar as noticias
app.post("/noticias/cadastro", cors(config), (req, res) => {

    const dados = new Noticia(req.body);
    dados.save().then((rs) => {
        res.status(201).send({ output: "Dados cadastrados " + rs })
    }).catch((erro) => res.status(400).send({ output: "Erro na execução " + erro }))

});


//rota para apagar uma noticia
app.delete("/apagar/:id", cors(config), (req, res) => {
    Noticia.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Noticia apagada." });
    });
});


// ----------------------------------------------------------------------------------------------------------
//                                     FIM ROTAS NOTICIA
// ----------------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------------
//                                        ROTA COLABORADOR
// -----------------------------------------------------------------------------------------------------------


//  Rota para exibir os cadastros dos colaboradores e administradores no bando de dados
app.get("/colaboradores", cors(config), (req, res) => {
    Colaborador.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um colaborador por seu id
app.get("/colaborador/:id", cors(config), (req, res) => {
    Colaborador.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os colaboradores e administradores 
app.post("/colaborador/cadastro",cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Colaborador(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({output:"Dados cadastrados "+rs})
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {

   
    Colaborador.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar " + erro });
            return;
        }
        res.status(200).send({ output: "atualizado com sucesso! " + dados });
    });


});
// Rota para apagar dados cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Colaborador.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Colaborador apagado." });
    });
});


// =-------------------------------------------------------------------------------------------------------------
//                                              FIM ROTAS COLABORADOR
// --------------------------------------------------------------------------------------------------------------








// -------------------------------------------------------------------------------------------------------------
//                                              ROTAS ADMINISTRADOR
// -------------------------------------------------------------------------------------------------------------


//  Rota para exibir o cadastro de administradores no bando de dados
app.get("/administradores", cors(config), (req, res) => {
    Administrador.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um administrador por seu id
app.get("/adm/:id", cors(config), (req, res) => {
    Administrador.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os  administradores 
app.post("/adm/cadastro",cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Administrador(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({output:"Dados cadastrados "+rs})
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {
    Administrador.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar " + erro });
            return;
        }
        res.status(200).send({ output: "atualizado com sucesso! " + dados });
    });


});
// Rota para apagar dados cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Administrador.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Administrador apagado." });
    });
});



// ------------------------------------------------------------------------------------------------------------
//                                        FIM ROTAS ADMINISTRADOR
// ------------------------------------------------------------------------------------------------------------






// ------------------------------------------------------------------------------------------------------------
//                                       ROTAS DE CONTATO
// ------------------------------------------------------------------------------------------------------------

// Criando rota da tabela contato

app.get("/contatos", cors(config), (req, res) => {
    Contato.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um produto por seu id
app.get("/contato/:id", cors(config), (req, res) => {
    Contato.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os colaboradores e administradores 
app.post("/contato/cadastro",cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Contato(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({output:"Dados cadastrados "+rs})
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {

   
    Contato.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar Contato " + erro });
            return;
        }
        res.status(200).send({ output: "Contato atualizado com sucesso! " + dados });
    });


});
// Rota para apagar contato cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Contato.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Contato apagado." });
    });
});




// -----------------------------------------------------------------------------------------------------------------
//                                     FIM DAS ROTAS DE CONTATO
// -----------------------------------------------------------------------------------------------------------------







// vamos configurar o servidor para responder na porta 3350
app.listen(3350, () => console.log("Servidor online ... "));