/**
 * Created by hari on 17/06/17.
 */
const request = require('request-promise');
const host = "https://api.github.com";
const search_path = "/search/repositories";
class SearchGithub {
    static _getPayload(q, sort, order) {
        return {
            url: host + search_path,
            qs: {q: q, sort: sort, order: order},
            headers: {
                'User-Agent': 'top-pack'
            }
        }
    }

    static search(key) {
        return request(this._getPayload(key)).then(result => {
            return JSON.parse(result)
        });
    }
}

module.exports = SearchGithub;