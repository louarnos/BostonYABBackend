const Author = require('../models/author.model');

const create = (req, res ) => {
    let name     = req.body.name
    let pronouns = req.body.pronouns
    let filepath =  req.files[0].filename

    if ( name ) {
        let authorData = { name };
        if ( pronouns ) { authorData.pronouns       = pronouns }
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
        res.json( { message: "You must provide a name to create an author" } )
    }
};

module.exports = {
    create: create,
}
