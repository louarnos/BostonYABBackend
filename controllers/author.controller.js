const Author = require('../models/author.model');

const create = (req, res ) => {
    let name     = req.body.name
    let pronouns = req.body.pronouns
    let filepath;

    if ( req.files && req.files[0] ) {
        filepath =  req.files[0].filename
    }

    if ( name ) {
        let authorData = { name };
        if ( pronouns ) { authorData.pronouns       = pronouns.split(',') }
        if ( filepath ) { authorData.profilePicture = filepath }

        let author = new Author(authorData)

        author.save()
            .then( post => {
                res.json({ author })
            })
            .catch( err => {
                res.json( { err } )
            })
    } else {
		res.status(400).json({error: "You must provide a name to create an author"});
    }
};

const show = ( req, res ) => {
	Author.find({}, (err, authors) => {
		res.json({authors});
   });
}

const update = ( req, res ) => {

    let name     = req.body.name
    let pronouns = req.body.pronouns
    let filepath;

    if ( req.files && req.files[0] ) {
        filepath =  req.files[0].filename
    }

    if ( name ) {
        let authorData = { name };
        if ( pronouns ) { authorData.pronouns       = pronouns.split(',') }
        if ( filepath ) { authorData.profilePicture = filepath }
        console.log( authorData );
        console.log( pronouns );

        Author.findOneAndUpdate( { _id: req.params.id }, { $set: authorData }, { new: true }, ( err, author ) => {
            if ( err ) {
		        res.status(400).json(err);
            }
            res.json({ author })
        });

    } else {
		res.status(400).json({error: "You must provide a name to create an author"});
    }
}

module.exports = {
    create,
    show,
    update,
}
