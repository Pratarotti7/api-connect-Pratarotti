const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ mensagem: "API Connect operando com sucesso!" });
});

app.use('/users', require('./routes/userRoutes'));

app.listen(PORT, () => {
    console.log(`Servidor iniciado com sucesso! Escutando na porta ${PORT}...`);
});
