/**
 * Created by hari on 17/06/17.
 */
const request = require('request-promise');
const search_path = "/search/repositories";
const GitHubService = require('./github-serivce');
class SearchGithub   {
    static _getPayload(q, sort, order) {
        return {
            url: search_path,
            qs: {q: q, sort: sort, order: order},
            headers: {
                'User-Agent': 'top-pack'
            }
        }
    }

    static search(key) {
        const gitHubService = GitHubService._getService();
       return gitHubService.requestGitHub(this._getPayload(key))
            .then(result => {
                return JSON.parse(result)
            });
    }
}

module.exports = SearchGithub;