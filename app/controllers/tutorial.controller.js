const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequielize.Op;

exports.create = (req, res) => {
    if(!req.body.title){
        return res.status(400).send({message: 'title cant be empty'})
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({message: err.message || 'error occur'});
        });

}

exports.findAll = (req, res) => {
    
}

exports.update = (req, res) => {
    
}

exports.delete = (req, res) => {
    
}

exports.deleteAll = (req, res) => {
    
}

exports.findAllPublished = (req, res) => {
    
}