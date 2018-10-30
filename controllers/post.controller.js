const Post = require('../models/post.model');

//Simple version, without validation or sanitation
const test = (req, res ) =>  {
    res.send('Greetings Evie Bruh!');
};

const add = ( req, res, next ) => {
    let body   = req.body.body
    let title  = req.body.title
    let author = req.body.author
    if ( body && title && author ) {
        let post = new Post({
            body: body,
            title: title,
            author: author
        })

        post.save()
            .then( post => {
                res.json({ post })
            })
            .catch( err => {
                res.json( { err } )
            })
    } else {
        res.json( { message: "You must provide a body, title, and author to create a post" } )
    }
}


module.exports = {
    test: test,
    add: add,
};
