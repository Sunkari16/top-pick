/**
 * Created by hari on 17/06/17.
 */
const cacheManager = require('cache-manager');
const memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 10 * 60/*seconds*/});
const host = "https://api.github.com";
const request = require('request-promise');
const _ = require('lodash');
let gitHubService = null;
class GitHubService {
    constructor() {
        if(gitHubService){
            throw new Error("Singleton shouldnt be intantiated multiple times");
        }
    }

    rateLimitRequest(requestOptions) {
        let cacheKey = requestOptions.url;
        _.each(requestOptions.qs, q => {
            const keys = _.keys(q);
            _.each(keys, key => {
                cacheKey += key + q[key];
            })
        });

        return memoryCache.get(cacheKey).then(function (result) {
            if (result) {
                throw new Error("Requested within a min before");
            }
            requestOptions.url = host + requestOptions.url;
            memoryCache.set(cacheKey, 'data', {ttl : 60});
            return request(requestOptions);
        })

    }

    requestGitHub(requestOptions) {
        return this.rateLimitRequest(requestOptions)
    }

    static _getService() {
        if(!gitHubService){
            gitHubService= new GitHubService();
        }
        return  gitHubService;
    }
}
module.exports = GitHubService;
