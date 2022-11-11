import { Router } from 'express';
const router = Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Hangman',
    });
});
// Import contact controller
import * as playController from './controller.js';
// Contact routes
router.route('/players')
    .get(playController.index)
    .post(playController.createItem);

router.route('/players/:player_id')
    .get(playController.viewItem)
    .patch(playController.update)
    .put(playController.update)


// Export API routes
export {router};