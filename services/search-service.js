/**
 * Created by hari on 17/06/17.
 */
const GithubSearchService = require('./github/search');
class SearchService {
    static search(q, sort, order){
        return GithubSearchService.search(q,sort,order);
    }
};
module.exports = SearchService;