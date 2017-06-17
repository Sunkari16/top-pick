/**
 * Created by hari on 17/06/17.
 */
const TopPacksService = require('../services/top-pack-service');
class TopPacksController {
    static topPacks(req, res, next) {
        TopPacksService.getTopPack()
            .then(result=> {res.json(result)})
            .catch(next);
    }
}
module.exports =TopPacksController;