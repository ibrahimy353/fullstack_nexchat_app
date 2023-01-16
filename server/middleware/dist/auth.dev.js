"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// the middleware here verifies the api end points in which it 
//allow the authorized user to be able to do things in which the non loged in user cant access or do
var verifyToken = function verifyToken(req, res, next) {
  var token, verified;
  return regeneratorRuntime.async(function verifyToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.header("Authorization"); //if the token entered doesnt exist then the system will give back output Access denaid
          //this is done through grabbing token from the front end to back end

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(403).send("Access Denaid"));

        case 4:
          if (token.startswith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
          }

          verified = Jwt.verify(token, process.env.JWT_SECRET);
          req.user = verified;
          next();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.verifyToken = verifyToken;