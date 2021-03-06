'use strict';

module.exports = function(Owner) {
    Owner.getOwnerById = function(id, callback){
        new Promise(function(resolve, reject) {
            // find name
            Owner.find({where : {ID : {like : id}}}, function(err, result){
                if(err) reject(err);
                if(result === null){
                    err = new Error("User Not Found");
                    err.statusCode = 404;
                    reject(err)
                }
                resolve(result);
            });
        }).then(function(res){
            if(!res) callback(err);
            return callback(null, res[0]);
        }).catch(function(err){
            callback(err);
        });
    };

    Owner.remoteMethod(
        'getOwnerById',
        {
            description: 'get user by name',
            accepts: [
                {arg: 'id', type: 'string'}
            ],
            returns:{
                arg:'res', type: 'object', root: true
            },
            http:{path: '/getOwnerById', verb: 'get'}
        }
    );
};
