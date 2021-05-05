'use strict';

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

require('./caps.js')(io);
require('./customers/drivers/driver')(io);
require('./customers/vendors/vendor.js')(io);
