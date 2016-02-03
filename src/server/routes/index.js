import Packages from 'content//Packages';
import BuySchema from 'validators//buy';

var passport = require('passport');
var express = require('express');
var validate = require('express-jsonschema').validate;
var router = express.Router();
var GitHubApi = require("github");
var User = require('../models/user');

const stripe = require("stripe")(
	process.env['STRIPE_SECRET']
);

let github = new GitHubApi({
  version: "3.0.0"
});

github.authenticate({
	type: "oauth",
	token: process.env['GITHUB_TOKEN']
});

function inviteToGitHubRepo(user) {
	if(process.env.NODE_ENV == "production") {
	  github.orgs.addTeamMembership({id: process.env['GITHUB_TEAM_ID'] , user: user.githubUser}, function(error,info){
	    if(error){
	      console.log('Failed To Invite GitHub User', user.githubUser, error);
	    } else {
	      console.log('Invited GitHub User', user.githubUser, info);
				user.update({ invitedToGitHubRepo: true }).exec();
	    }
	  })
	}
}

router.post('/buy', validate({body: BuySchema}), function(req, res, next) {
	const stripeToken = req.body.stripeToken;
  let packge = Packages.find((element) => element.id == req.body.packageId);

	stripe.charges.create({
		amount: packge.price,
		currency: 'usd',
		source: stripeToken,
		receipt_email: req.body.email,
		description: 'Bought book ThinkingInReact',
		metadata: {
			email: req.body.email,
			name: req.body.name
		}
	}, function(err, charge) {
    if(err) {
			switch (err.type) {
			  case 'StripeCardError':
			    return res.status(402).json({error: {message: "Your Card Was Declined" }});
				default:
					console.log(err);
			    return res.status(402).json({error: {message: "Couldn't process your payment. Please email k@2052.me (or @k_2052 on twitter)" }});
			}
    } else {
			let userData = {email: req.body.email, name: req.body.name, githubUser: req.body.githubUser, boughtPackageId: req.body.packageId};
      User.register(new User(userData), req.body.password, function(err, user) {
        if (err) {
          return res.status(400).json({error: {message: err.message}});
        }

        if(user.githubUser) {
					inviteToGitHubRepo(user);
				}

        passport.authenticate('local')(req, res, function () {
	        req.session.save(function (err) {
	          if (err) {
	            return next(err);
	          }

			      return res.json({
			        message: 'user authenticated',
			        user: {
			          email: user.email,
			          name:  user.name,
			          githubUser: user.githubUser
			        }
			      });
	        });
        });
      });
    }
	});
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      return res.json(403, {
        message: 'no user found'
      });
    }

    // Manually establish the session...
    req.login(user, function(err) {
      if (err) return next(err);
      return res.json({
        message: 'user authenticated',
        user: {
          email: user.email,
          name:  user.name,
          githubUser: user.githubUser
        }
      });
    });

  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();

  req.session.save(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

module.exports = router;
