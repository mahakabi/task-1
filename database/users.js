// database/users.js

const users = [
    { id: 1, name: 'Hamzah' },
    { id: 2, name: 'Khalid' },
    { id: 3, name: 'Maha' }
];

function getUserById(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = users.find(user => user.id === Number(id));
            resolve(user);
        }, 1000);
    });
}

module.exports = {
    users,
    getUserById
};