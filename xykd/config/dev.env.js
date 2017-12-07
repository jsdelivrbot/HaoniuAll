var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HTTP:'"http://192.168.1.111:8080/"',
  TEST_HTTP:'"http://121.196.210.85:8090/xjd/"'
})
