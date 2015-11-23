/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	count:function (req, res) {
          User.count().exec(function(error,count){
          //Domain.count({tld: req.param('tld','%')}).done(function(error,count){
          if(req.param('raw') == 1){
            return res.json(count);
          }
        //res.header("Access-Control-Allow-Origin:*");
         return res.json({
              count: count,
            });
      });
  },
};

