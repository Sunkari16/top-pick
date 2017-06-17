/**
 * Created by hari on 17/06/17.
 */
const request = require('request-promise');
const host = "https://api.github.com";
const search_path = "/repos";
class SearchGithub {

    static _getPayload(contentRequestDetails) {
        console.log(contentRequestDetails, "url :" + host + search_path + '/' + contentRequestDetails.owner + '/' + contentRequestDetails.repo + '/contents/' + contentRequestDetails.file);
        return {
            url: host + search_path + '/' + contentRequestDetails.owner + '/' + contentRequestDetails.repo + '/contents/' + contentRequestDetails.file,
            headers: {
                'User-Agent': 'top-pack'
            }
        }
    }

    static _fetchPackageFile(repo, owner, file) {
        return request(this._getPayload({owner: owner, repo: repo, file: file})).then(result => {
            return JSON.parse(result)
        }).then(result=>{
            if(!result || !result.download_url){
                throw new Error("Package json not found");
            }
            return request({url :result.download_url});
        })
    }

    static fetchPackageJSON(repo, owner) {
        return this._fetchPackageFile(repo, owner, 'package.json')

    }
}

module.exports = SearchGithub;