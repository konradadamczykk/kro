var	express	=	require('express');
var	router	=	express.Router();
var	mongoose =	require('mongoose');

router.route('/posts')
	.get(
		function(req,res) {
			var	Post	=	mongoose.model('Post');
//			Post.findById(id,	function(err,	post){})
			Post.find({},	function(err,	posts){
				console.log(posts)
				return	res.json({'posts' : posts});
			})
		}
	)
	.post(function(req, res) {
		var	Post	=	mongoose.model('Post');
		post = new Post();
		post.message = req.body.created_by;
		post.text = req.body.text;
		post.save(function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
		//mongoose.save(req);
	})

router.route('/posts/:id')
	.get(function(req,res) {
		var	Post	=	mongoose.model('Post');
		post.findById(req.params.id, function(err,	post){
			if (err)
				res.send(err);
			return res.json(post);
		})}
	)
	.delete(function(req,res){
		var	Post	=	mongoose.model('Post');
		Post.remove({_id: req.params.id}, function(err) {
			if (err)
				res.send(err);
			return res.json({"status": "OK"});
		})
	})
	.put(function(req, res){
		var	Post	=	mongoose.model('Post');
		Post.save({_id: req.params.id}) {
			if (err)
				res.send(err);
		}
	}

module.exports	=	router;
