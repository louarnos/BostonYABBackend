const Post = require('../models/post.model');

const index = (req, res, next) => {
	Post.find({}, (err, posts) => {
		let postMap = {};

		posts.forEach( ( post ) => {
		  postMap[post._id] = post;
		});
		res.send(postMap);  
   });
};

const add = ( req, res, next ) => {
    let body   = req.body.body
    let title  = req.body.title
    let author = req.body.author
    console.log( req.files );
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

const update = ( req, res, next ) => {
    let data   = {
        body: req.body.body,
        title: req.body.title,
        author: req.body.author,
        _id: req.body._id,
    }
    Post.updateOne( data )
        .then( res => {
            res.json({ res })
        })
        .catch( err => {
            res.json( { err } )
        });
}

const destroy = ( req, res, next ) => {
    Post.findByIdAndRemove( req.body._id, ( err, doc ) => {
            res ? res.json( { message: "deletion successful",  doc }) : res.json({ err })
        })
}

module.exports = {
    add: add,
    update: update,
    index: index,
    destroy: destroy,
};
