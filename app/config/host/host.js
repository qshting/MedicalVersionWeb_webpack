

if(process.env.NODE_ENV==="production"){
    module.exports = require('./host.pro');
}else if(process.env.NODE_ENV==="development"){
    module.exports = require('./host.dev');
}