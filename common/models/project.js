'use strict';

module.exports = function(project) {
    project.getProjectByKp = function(ktProject, callback){
        new Promise(function(resolve, reject) {
            // find name
            project.find({where : {ketuaProject : {like : ktProject}}}, function(err, result){
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

    project.remoteMethod(
        'getProjectByKp',
        {
            description: 'get project by Ketua Projek',
            accepts: [
                {arg: 'ketuaProject', type: 'string'}
            ],
            returns:{
                arg:'res', type: 'object', root: true
            },
            http:{path: '/getProjectByKp', verb: 'get'}
        }
    );
};
