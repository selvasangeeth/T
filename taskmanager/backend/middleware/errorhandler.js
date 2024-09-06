const {constants} = require("../Constants");

const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    res.status(statusCode);
  
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "Validation Error",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
  
      case constants.NOT_FOUND:
        res.json({
          title: "Resource Not Found",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
  
      case constants.INTERNAL_SERVER_ERROR:
        res.json({
          title: "Internal Server Error",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
  
      default:
        res.json({
          title: "Error",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
    }
  };
  
  module.exports = errorhandler;
  