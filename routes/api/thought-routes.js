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

//delete thought from user as well
router
  .route('/:thoughtId/:userId')
  .delete(removeThought);


//get single thought by id
router
  .route('/:thoughtId')
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