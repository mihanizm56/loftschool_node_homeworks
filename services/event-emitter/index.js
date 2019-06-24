const ee = require("@nauma/eventemitter");
const DATABASE = new ee.EventEmitter("database");

global.DATABASE = DATABASE;
