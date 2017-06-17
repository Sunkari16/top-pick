/**
 * Created by hari on 17/06/17.
 */
const GithubSearchService = require('./github/search');
const Models = require('../models/models');
const  _ = require('lodash');
class SearchService {
    static _saveResults(key, sort, order, result) {
        const SearchResultsModel = Models.SearchResults;
        const searchResults = new SearchResultsModel({});
        console.log(searchResults);

       _.extend(searchResults,  {
            key: key,
            sort: sort,
            order: order,
            results: result
        });
        searchResults.save().then(data => {
            console.log(" Results saved for key " + key)
        });
    }
    static _markPreImported(result){
        const repos=  result.items;
        if(_.isEmpty(repos)){
            return result;
        }
        const PackageDetailsSchema = Models.PackageDetailsSchema;
        const repoAndOwnerMap = _.map(repos, repo => { return {repo: repo.name, owner : _.get(repo, 'owner.login')}});
        const reposMap = _.keyBy(repos, repo=> {return repo.name+'_'+ _.get(repo, 'owner.login')});
        return PackageDetailsSchema.find({$or : repoAndOwnerMap}).select({repo :1,owner:1 } )
            .then(importedRepos  => {
                console.log(importedRepos);
                _.each(importedRepos, importedRepo=>{
                    if(reposMap[importedRepo.repo+'_'+importedRepo.owner]){
                        console.log(importedRepo.repo);
                        reposMap[importedRepo.repo+'_'+importedRepo.owner].imported = true;
                    }
                })
            } )
            .then(()=>{ return result});
    }

    static search(q, sort, order) {
        const SearchResultsModel = Models.SearchResults;
        return SearchResultsModel.findOne({key: q}).lean()
            .then(result => {

                if (result) {
                    if(result.toObject){ result = result.toObject()}
                    return result.results;
                }
                return GithubSearchService.search(q, sort, order)
                    .then(result => {
                        // console.log(result);
                        if(_.isEmpty(result.items)){
                            return result;
                        }
                        this._saveResults(q, sort, order, result);
                        return result;
                    });
            })
            .then(this._markPreImported)
    }
}
;
module.exports = SearchService;