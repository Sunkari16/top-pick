/**
 * Created by hari on 17/06/17.
 */
const Models = require('../models/models');
const _ = require('lodash');
const GithubContentManager = require('./github/contents')
class ImportService {
    static _savePackageJOSNToDB(repo, owner, content) {
        const PackageDetailsSchema = Models.PackageDetailsSchema;
        const packageDetails = new PackageDetailsSchema({
            repo: repo,
            owner: owner,
            data: content,
            dependencies: _.keys(_.get(content, 'dependencies'))
        })
        return packageDetails.save();
    }

    static importPackageJson(repo, owner) {
        const PackageDetailsSchema = Models.PackageDetailsSchema;
        return PackageDetailsSchema.findOne({repo : repo, owner: owner})
            .then(packageDetails => {
                if(packageDetails){
                    return packageDetails;
                }
                return GithubContentManager.fetchPackageJSON(repo, owner)
                    .then(content => {
                        if (typeof content == 'string') {
                            content = JSON.parse(content);
                        }
                        return this._savePackageJOSNToDB(repo, owner, content);
                    })
            })

    }
}

module.exports = ImportService;