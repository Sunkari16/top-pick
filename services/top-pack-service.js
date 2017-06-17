/**
 * Created by hari on 17/06/17.
 */
const Models = require('../models/models');
class TopPackService {
    static getTopPack() {
        let aggQuery = [
            {
                $unwind: '$dependencies'
            },
            {
                $group: {
                    _id: '$dependencies',
                    count: {$sum: 1}
                }
            },
            {$sort: {count :-1}},
            {$limit: 10}
        ];
        const PackageDetailsSchema = Models.PackageDetailsSchema;
        return PackageDetailsSchema.aggregate(aggQuery).exec();
    }

}
module.exports = TopPackService;