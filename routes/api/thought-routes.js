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
  .get(getThoughtById)
  .put(updateThought);

//reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;