const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought, 
  updateThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtsControllers');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').delete(deleteReaction).post(addReaction);

module.exports = router;