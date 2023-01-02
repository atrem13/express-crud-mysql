const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

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
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({where:condition})
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({message: err.message || 'error occur'});
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if(data){
                res.send(data)
            }else{
                res.status(404).send({message: `cant find data with id = ${id}`});
            }
        }).catch(err => {
            res.status(500).send({message: err.message || 'error occur'});
        });
    
}
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
            where: {id: id},
        })
        .then(data => {
            if(data == 1){
                res.send({message: 'data updated'})
            }else{
                res.status(404).send({message: `cant update data with id = ${id}`});
            }
        }).catch(err => {
            res.status(500).send({message: err.message || 'error occur'});
        });
    
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
            where: {id: id},
        })
        .then(data => {
            if(data == 1){
                res.send({message: 'data deleted'})
            }else{
                res.status(404).send({message: `cant delete data with id = ${id}`});
            }
        }).catch(err => {
            res.status(500).send({message: err.message || 'error occur'});
        });
    
}

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then(data => {
            res.send({message: `deleted ${data} data`})
        }).catch(err => {
            res.status(500).send({message: err.message || 'error occur'});
        });
    
}

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({where: {published:true}})
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({message: err.message || 'error occur'});
        });
}