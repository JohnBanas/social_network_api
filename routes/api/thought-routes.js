const router = require('express').Router();
const { getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/comment-controller');

// /api/thoughts/
router
  .route('/')
  .get(getAllThoughts);

// /api/thoughts/<userId>
router
  .route('/:userId')
  .get(getThoughtById)
  .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
// You need two parameters to delete a thought because
// you need the thought id, but you also need to know which user that
// thought came from to update the association & delete the associated thought data
//from the user
router
  .route('/:userId/:thoughtId')
  .delete(removeThought)
  .put(updateThought);

//reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);


module.exports = router;