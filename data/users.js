const crypto = require('crypto');

const users = [];

const generateId = () => {
    return crypto.randomUUID();
};

module.exports = {
    users,
    generateId
};
