module.exports = (app) => {
    const filmes = require('../controller/filme-controller');

    // Create a new Product
    app.post('/filmes', filmes.create);

    // Retrieve all filmes
    app.get('/filmes', filmes.findAll);

    // Retrieve a single Product with productId
    app.get('/filmes/:filmeId', filmes.findOne);

    // Update a Note with productId
    app.put('/filmes/:filmeId', filmes.update);

    // Delete a Note with productId
    app.delete('/filmes/:filmeId', filmes.delete);
}