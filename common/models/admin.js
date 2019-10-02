'use strict';

module.exports = function(Admin) {
    Admin.getAdminByLevel = function(Level, callback){
        new Promise(function(resolve, reject) {
            // find Admin Level
            Admin.find({where : {adminLevel : {like : Level}}}, function(err, result){
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

    Admin.remoteMethod(
        'getAdminByLevel',
        {
            description: 'get Admin by Level',
            accepts: [
                {arg: 'Level', type: 'string'}
            ],
            returns:{
                arg:'res', type: 'object', root: true
            },
            http:{path: '/getAdminByLevel', verb: 'get'}
        }
    );
};

