/**
 * DomainController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DomainController)
   */
  _config: {},

  countLetter:function (req, res) {
          Domain.native(function(err, collection) {
            if (err) return res.serverError(err);
            collection.find({$where: "this.name.length=="+req.param('letter'), taken: 0}).count(function (err, results) {
              if (err) return res.serverError(err);
              if(req.param('raw') == 1){
                return res.json(results);
              }
             return res.json({
                  count: results,
                });
            });
          });
  },

  count:function (req, res) {
      Domain.count({tld: req.param('tld','%')}).exec(function(error,count){
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
  report:function (req, res) {
      var dns = require('dns');
      Domain.findOne(req.params.id).exec(
      function(err,myRecords){

        // Grab a record off the top of the returned array and save a new attribute to it
        myRecords.reported = 1;
        myRecords.save(
          function(err,s){
            res.json('Domain with ID '+s.id+' now has reported '+s.reported);
        });
        var domain = myRecords.name+'.'+myRecords.tld
        dns.resolve4(domain, function (err, addresses) {
          if (err) {console.log('bad report')}
          else{
            console.log('hi');
            myRecords.taken = 1;
            myRecords.save();
          }
        });
      });
  },
  countByAvailability:function (req, res) {
      var taken = 1;
      if(req.param("taken") == 0)
      taken = 0;
      Domain.count({tld: req.param('tld','%'),taken:taken}).exec(function(error,count){
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
  index:function (req, res) {
      var page=req.param("page",null);
      var limit=req.param("limit",null);
      var tld=req.param("tld",'%');
      var taken = 0;
      if(req.param("taken") == 1)
      taken = 1;
      if(page&&limit)
      {
        Domain.find({tld:tld,taken:taken}).paginate({page:page,limit:limit})
         .exec(function(error,data){
          var result = {
                        data: [
                                  data,
                                 ],
                        meta:{
                              page:page,
                              limit:limit,
                             }
                       }
         return res.json(result);
        });
      }
      else
          return res.json([ ]);
  },
  datatable:function (req, res) {
      var tld=req.param("tld",'%');
      var taken = 0;
      if(req.param("taken") == 1)
      taken = 1;
      var sortit = 'id';
      if(req.param("sortit") == 'expiration') sortit = "expiration";
      Domain.find({tld:tld,taken:taken}).sort(sortit+' ASC').limit(7000)
       .exec(function(error,data){
       return res.json(data);
  });
  },

  datatableExp:function (req, res) {
      var tld=req.param("tld",'%');
      var taken = 0;
      if(req.param("taken") == 1)
      taken = 1;
      var sortit = 'id';
      if(req.param("sortit") == 'expiration') sortit = "expiration";
      Domain.find({tld:tld,taken:taken, expiration:{'!': ''}}).sort(sortit+' ASC').limit(1000)
       .exec(function(error,data){
       return res.json(data);;
  });
  },

  
};
