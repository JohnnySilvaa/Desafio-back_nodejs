const Filme = require('../models/filme-model.js');

//Create new filme
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Filme content can not be empty"
        });
    }

    // Create a filme
    const filme = new Filme({
        title: req.body.title || "No filme title", 
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    // Save filme in the database
    filme.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the filme."
        });
    });
};

// Retrieve all filmes from the database.
exports.findAll = (req, res) => {
    Filme.find()
    .then(filmes => {
        res.send(filmes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving filmes."
        });
    });
};

// Find a single filme with a filmeId
exports.findOne = (req, res) => {
    Filme.findById(req.params.filmeId)
    .then(filme => {
        if(!filme) {
            return res.status(404).send({
                message: "filme not found with id " + req.params.filmeId
            });            
        }
        res.send(filme);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "filme not found with id " + req.params.filmeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving filme with id " + req.params.filmeId
        });
    });
};

// Update a filme
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "filme content can not be empty"
        });
    }

    // Find and update filme with the request body
    Filme.findByIdAndUpdate(req.params.filmeId, {
        title: req.body.title || "No filme title", 
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new: true})
    .then(filme => {
        if(!filme) {
            return res.status(404).send({
                message: "filme not found with id " + req.params.filmeId
            });
        }
        res.send(filme);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "filme not found with id " + req.params.filmeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.filmeId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Filme.findByIdAndRemove(req.params.filmeId)
    .then(filme => {
        if(!filme) {
            return res.status(404).send({
                message: "filme not found with id " + req.params.filmeId
            });
        }
        res.send({message: "filme deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "filme not found with id " + req.params.filmeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete filme with id " + req.params.filmeId
        });
    });
};