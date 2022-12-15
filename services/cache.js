const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const redisUrl = keys.redis;
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;


mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true; // keep track if consumer wants to leverage caching or not.
    this.hashKey = JSON.stringify(options.key || 'default');  // if you pass in a key property, we are going to use that as our 'hashKey'. Stringifying so we can use it as a key. This has it so we can use something other than the ID column as our unique identifier for our cache.
    return this; // make it chainable.
};

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    const key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    });

    // see if we have a value for 'key'
    const cacheValue = await client.hget(this.hashKey, key);

    if (cacheValue) {
        const doc = JSON.parse(cacheValue);
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 100);
    return result;
};


module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey)); // we are stringfying because a number or object could be passed in. 
    }
}