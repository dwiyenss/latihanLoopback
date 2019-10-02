'use strict';

module.exports = function(Employee) {
    Employee.getEmployeeByName = function(name, callback){
        new Promise(function(resolve, reject) {
            // find name
            Employee.find({where : {nama : {like : name}}}, function(err, result){
                if(err) reject(err);
                if(result === null){
                    err = new Error("User Not Found");
                    err.statusCode = 404;
                    reject(err)
                }
                resolve(resolve);
            });
        }).then(function(res){
            if(!res) callback(err);
            return callback(null, res[0]);
        }).catch(function(err){
            calback(err);
        });
    };

    Employee.remoteMethod(
        'getEmployeeByName',
        {
            description: 'get user by name',
            accepts: [
                {arg: 'name', type: 'string'}
            ],
            returns:{
                arg:'res', type: 'object', root: true
            },
            http:{path: '/getEmployeeByName', verb: 'get'}
        }
    );
};
