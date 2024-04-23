const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // Importe o módulo 'path'

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware para lidar com CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configurar o banco de dados SQLite3
const db = new sqlite3.Database("pedidos.db", (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados", err.message);
    } else {
        console.log("Banco de dados conectado com sucesso");
        // Criar a tabela pedidos se ela não existir
        db.run(`CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            endereco_entrega TEXT,
            observacoes_pedido TEXT
        )`, (err) => {
            if (err) {
                console.error("Erro ao criar a tabela pedidos", err.message);
            } else {
                console.log("Tabela pedidos criada com sucesso");
            }
        });

        // Criar a tabela itens_pedido se ela não existir
        db.run(`CREATE TABLE IF NOT EXISTS itens_pedido (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pedido_id INTEGER,
            produto TEXT,
            quantidade INTEGER,
            preco REAL,
            FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
        )`, (err) => {
            if (err) {
                console.error("Erro ao criar a tabela itens_pedido", err.message);
            } else {
                console.log("Tabela itens_pedido criada com sucesso");
            }
        });
    }
});


// Rota para servir o arquivo viewdb.html
app.get("/viewdb.html", (req, res) => {
    res.sendFile(path.join(__dirname, "viewdb.html")); // Envie o arquivo viewdb.html
});

// Rota para receber o pedido do frontend
app.options("/enviar-pedido", (req, res) => {
    res.sendStatus(200);
});

app.post("/enviar-pedido", (req, res) => {
    const pedido = req.body;

    // Extrair elementos individuais do objeto endereco
    const { rua, numero, bairro, complemento } = pedido.endereco;

    // Inserir informações gerais do pedido na tabela de pedidos (orders)
    db.run(
        'INSERT INTO pedidos (endereco_entrega, observacoes_pedido) VALUES (?, ?)',
        [`${rua}, ${numero}, ${bairro}, ${complemento}`, pedido.observacoes],
        function (err) {
            if (err) {
                console.error("Erro ao inserir o pedido no banco de dados", err.message);
                res.status(500).json({ error: "Erro ao processar o pedido" });
                return;
            }

            // Obter o ID do pedido recém-inserido
            const orderId = this.lastID;

            // Inserir cada item do carrinho na tabela de itens de pedido (order_items)
            pedido.itensCarrinho.forEach(item => {
                db.run(
                    `INSERT INTO itens_pedido (pedido_id, produto, quantidade, preco) VALUES (?, ?, ?, ?)`,
                    [orderId, item.nomeProduto, item.quantidade, item.precoProduto],
                    function (err) {
                        if (err) {
                            console.error("Erro ao inserir o item do pedido no banco de dados", err.message);
                            res.status(500).json({ error: "Erro ao processar o pedido" });
                            return;
                        }
                    }
                );
            });

            // Enviar resposta de sucesso quando todas as inserções estiverem concluídas
            console.log("Pedido inserido com sucesso no banco de dados:", pedido);
            res.sendStatus(200);
        }
    );
});







app.get("/dados", (req, res) => {
    db.all("SELECT * FROM pedidos LEFT JOIN itens_pedido ON pedidos.id = itens_pedido.pedido_id", (err, rows) => {
        if (err) {
            console.error("Erro ao buscar dados do banco de dados", err.message);
            res.status(500).send("Erro ao buscar dados do banco de dados");
        } else {
            res.json(rows);
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
