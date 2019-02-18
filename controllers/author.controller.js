const Author = require('../models/author.model');

const create = (req, res ) => {
    console.log( req.body );
    res.json({ message: 'hit it'})
};

module.exports = {
    create: create,
}
