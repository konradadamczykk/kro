var	express	=	require('express');
var	router	=	express.Router();


router.route('/posts')
	.get(
		function(req,res) {
			var	mongoose	=	require(	'mongoose'	);
			var	Post	=	mongoose.model('Post');
//			Post.findById(id,	function(err,	post){})
			Post.find({},	function(err,	posts){
				console.log(posts)
				return	res.json({'posts' : posts});
			})
		}
	)
	.post(function(req,res){})
	.delete(function(req,res){})
	.put(function(req,res){});

