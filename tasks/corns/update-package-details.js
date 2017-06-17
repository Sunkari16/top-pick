/**
 * Created by hari on 17/06/17.
 */
const Models = require('../../models/models');
const moment = require('moment');
const UPDATE_INTERVAL_IN_MIN = 30;
const importService   =  require('../../services/import-service');
const Promise = require('bluebird');
const _ = require('lodash');
class PackgeUpdater {
    constructor(){

    }
    _getPackagesAndUpdate(){
        new Promise(function (resolve, reject) {
            const PackageDetailsSchema = Models.PackageDetailsSchema;

            const query = {
                $or: [{last_update_date: {$lt: moment().subtract(UPDATE_INTERVAL_IN_MIN, 'min').toDate()}},
                    {last_update_date: {$exists: false}}]
            };

            const updatablePackesStream =  PackageDetailsSchema.find(query).stream();
            updatablePackesStream.on('data', (packageDetails) => {
                importService.updatePackageJson(packageDetails);
            }).on('error', error => {
                reject(error);
                resolve = reject = _.noop;
            }).on('close', function () {
                resolve();
            });
        })


    }
    updatePackages(){
        return this._getPackagesAndUpdate().then(() => console.log("Updated the packages"));
    }

}
module.exports = PackgeUpdater;