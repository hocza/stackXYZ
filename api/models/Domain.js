/**
 * Domain
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'domains',
  attributes: {
    name: 'STRING',
    tld: 'STRING',
    taken: 'INTEGER',
    expiration: 'DATE',
    reported: 'INTEGER',

    /* e.g.
    nickname: 'string'
    */
    
  }

};
