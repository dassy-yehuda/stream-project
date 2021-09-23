const router = require('express').Router();
const liveVideo = require('../controllers/liveVideo.controller');

router.post('/:userName/createVideo', liveVideo.createVideo);

module.exports = router;