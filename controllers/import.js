/**
 * Created by hari on 17/06/17.
 */
const ImportService = require('../services/import-service');
const _ = require('lodash');
class SearchController {
    static import(req, res, next) {
        const repo = req.query.repo;
        const owner = req.query.owner;
        if (_.isEmpty(repo) || _.isEmpty(owner)) {
            const error = new Error("Please provide a valid repo & owner");
            error.status = 400;
            return next(error);
        }
        ImportService.importPackageJson(repo, owner)
            .then(() => {
                res.json({ message : 'success'});
            })
            .catch(err=>{
                if(err.statusCode===404){
                    err.message="Project doesnt have packge.json";
                }
                next(err);
            });
    }
}
module.exports =SearchController;