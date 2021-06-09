const router = require('express').Router();
const { getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router
  .route('/')
  .get(getAllThoughts);

// /api/thoughts/<userId>
router
  .route('/:userId')
  .post(addThought);


//get single thought by id
router
  .route('/:thoughtId')
  .delete(removeThought)
  .get(getThoughtById);

// /api/thoughts/<userId>/<thoughtId>
// You need two parameters to delete a thought because
// you need the thought id, but you also need to know which user that
// thought came from to update the association & delete the associated thought data
//from the user
router
  .route('/:userId/:thoughtId')
  .put(updateThought);

//reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;