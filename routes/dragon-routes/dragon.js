const express = require('express');
const router  = express.Router();
const Dragon = require('../../models/Dragon')
const uploadCloud = require('../../config/cloudinary-setup');

/* GET home page */
router.get('/', (req, res, next) => {
  Dragon.find()
  .then(allDragonsFronDB => {
    res.render('dragons/dragons-home', { dragons: allDragonsFronDB });
  })
  .catch(err => next(err));
});

//create route for our dragon
router.post('/create', uploadCloud.single('image'), 
(req,res, next) => {
  console.log({body: req.body, file: req.file});

  const dragonInputInfo = req.body;
  dragonInputInfo.image = req.file.url;

  Dragon.create(dragonInputInfo)
  .then(newlyCreatedDragon => {
    console.log({newlyCreatedDragon})
    res.redirect('back');
  })
  .catch(err => next(err));
})

module.exports = router;