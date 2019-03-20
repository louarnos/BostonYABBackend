const Post = require('../models/post.model');

const index = (req, res, next) => {
    Post.find({}).populate('author').exec( ( err, posts ) => {
		res.send({ posts});
    })
};

const create = ( req, res, next ) => {
    let body   = req.body.body
    let title  = req.body.title
    let author = req.body.authorId
    let video  = req.body.video

    if ( body && title && author ) {
        let data = {
            body: body,
            title: title,
            author: author,
            video: video
        }

        if ( req.body.tags ) {
            data.tags = req.body.tags.split(',');
        }

        if ( req.files && req.files.length ) {
            data.files = req.files.map( img => img.filename )
        }

        let post = new Post(data)

        post.save()
            .then( post => {
                post.populate('author', ( err, post) => {
                    if ( err ) { Promise.reject( err ); }
                    res.json({ post })
                });
            })
            .catch( err => {
                res.json( { err } )
            })
    } else {
        res.status(401).json( { error: "You must provide a body, title, and author to create a post" } )
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
    Post.findByIdAndDelete( req.params.id, ( err, doc ) => {
            if ( err ) {
                res.json({err});
            }
            if ( doc ) {
                res.json({doc});
            }
            next();
    });
}

module.exports = {
    create,
    update,
    index,
    destroy,
};
