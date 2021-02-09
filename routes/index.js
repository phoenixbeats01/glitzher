const express = require('express');
const _ = require('underscore');
const Data = require('../models/Data');
const redis = require('redis');

const PORT_REDIS = process.env.PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);

const router = express.Router();

// Todo
// start the front-end and display the information in a way where you can compare
// use affiliatejs to make all links affiliate links.
// have a way to load as you scroll
// the problem is that /api is fetching from database and is not checking if there is a cache

var update_id = 'key1322';

const set = (key, value) => {
  // set 43200 (12hrs) as cache time
  redisClient.setex(key, 20, JSON.stringify(value));
};

const get = (req, res, next) => {
  let key = update_id;

  redisClient.get(key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};

// Routes
router.get('/api', get, async (req, res) => {
  const _id = '60108f05160579104738afa3';
  try {
    // Fetch Data
    const data = await Data.find({ _id });
    const dataCount = Object.keys(data[0].api.result).length;

    // Querys
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || dataCount;
    const discounted = req.query.discounted || true;

    // Add Pages
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const dataResult = data[0].api.result.slice(startIndex, endIndex);

    // Filter api
    if (discounted === 'true') {
      // Filter results for discount
      const filterDiscounted = dataResult.filter((x) => x.price.discounted);
      res.send(filterDiscounted);
      // set(update_id, filterDiscounted);
    } else {
      // Send data to client
      set(update_id, dataResult);
      res.send(dataResult);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Hmm. Something went wrong on our end.',
      type: 'ServerError',
    });
  }
});

router.get('/api/bestProduct', async (req, res) => {
  const { q } = req.query;
  try {
    // Client validation
    if (q === '' || q.length < 3 || q.length > 150) {
      console.log(q.length);
      return res.sendStatus(400);
    }

    try {
      // Fetch Data
      const data = await Data.find();
      const amazon = data[0].api.result;
      const sephora = data[1].api.result;
      const result = Object.assign(sephora, amazon);

      // Querys
      const query = req.query.q;

      // Filter
      const filterdResults = result.filter(({ title }) =>
        title.includes(query)
      );

      // Sort results
      const sortedResults = filterdResults.sort(
        (a, b) =>
          // Special expression is replacing '$'
          parseFloat(a.price.replace(/\$/g, '')) -
          parseFloat(b.price.replace(/\$/g, ''))
      );

      // Send data to front end
      res.status(200).send(sortedResults);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500); // Server error
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500); // Server error
  }
});

module.exports = router;
