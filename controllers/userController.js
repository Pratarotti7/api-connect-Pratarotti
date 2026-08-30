const { users, generateId } = require('../data/users');

const listUsers = (req, res) => {
    return res.status(200).json(users);
};

const createUser = (req, res) => {
    const { nome, email } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ 
            error: "Validação falhou: O campo 'nome' é obrigatório e deve ser um texto válido." 
        });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ 
            error: "Validação falhou: O campo 'email' é obrigatório e deve conter um endereço válido." 
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Validação falhou: O formato do 'email' fornecido é inválido."
        });
    }

    const newUser = {
        id: generateId(),
        nome: nome.trim(),
        email: email.trim()
    };

    users.push(newUser);

    return res.status(201).json({ data: newUser });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ 
            erro: "Usuário não encontrado. O identificador fornecido é inválido ou o registro foi removido." 
        });
    }

    return res.status(200).json(user);
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ 
            erro: "Usuário não encontrado. Não foi possível realizar a atualização." 
        });
    }

    const updatedUser = {
        ...users[userIndex],
        ...(nome && { nome }),
        ...(email && { email })
    };

    users[userIndex] = updatedUser;

    return res.status(200).json(updatedUser);
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ 
            erro: "Usuário não encontrado. Não foi possível realizar a exclusão." 
        });
    }

    users.splice(userIndex, 1);

    return res.status(200).json({ mensagem: "Usuário removido com sucesso." });
};

module.exports = {
    listUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
