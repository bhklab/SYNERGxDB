var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getItems', function(req, res, next) {
  const list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

module.exports = router;
