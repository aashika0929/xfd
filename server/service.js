'use strict';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('../config/');
// const logger = require('./../../systemAppLogger');

function createApp() {
  const app = express();
  return app;
}

function setupStaticRoutes(app) {
  app.use(express.static(path.resolve(__dirname, '../', 'webclient')));
  return app;
}

function setupRestRoutes(app) {
  //console.log('Inside service setupRestRoutes');
  // app.use('/users', require(path.join(__dirname, './users')));

app.use('/Xfd', require(path.join(__dirname, './Xfd')));



  // let storage = multer.diskStorage({
  //   destination: function(req, file, cb) {
  //     cb(null, './server/CsvFiles');
  //       cb(null, 'C:\\Users\\th351985\\Documents\\Neo4j\\default.graphdb\\default.graphdb');
  //   },filename: function(req, file, cb) {
  //     const name = 'arun.csv';
  //     cb(null, name);
  //   }
  // });
  // app.get('/Xfd', function(req, res){
  //   let count =0;
  //   console.log('inside sendsms',count++);
  //   const accountSid = 'AC3fa3da63c038b6140dc9564ac024f91f';
  //   const authToken = '4e8b7fef7b48482c3247803486ce255d';
  //   const client = require('twilio')(accountSid, authToken);
  //   client.messages.create({
  //     to: '+918971257921',
  //     from: '+14158914560',
  //     body: 'Send from nodejs',
  //   })
  //   .then((message) => console.log(",,,,,,,,,,,,",message.sid))
  //   .catch((err) => console.log(",,,,,,,,,,,,",err));
  // });

    app.use(function(req, res) {
      let err = new Error('Resource not found');
      err.status = 404;
      return res.status(err.status).json({
        error: err.message
      });
    });

    app.use(function(err, req, res) {
      // logger.error('Internal error in watch processor: ', err);
      return res.status(err.status || 500).json({
        error: err.message
      });
    });

    return app;
  }

  function setupMiddlewares(app) {
    //  For logging each requests
    app.use(morgan('dev'));
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));

    app.use(require('express-session')({secret:'accesskey'}));
    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.use(connectflash());

    const compression = require('compression');
    app.use(compression());

    app.use(function(req,res,next)
    {
      res.header('Access-Control-Allow-Origin',"*");
      res.header('Access-Control-Allow-Method','GET,POST,PUT,DELETE');
      res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
    });

    return app;
  }

  function setupWebpack(app) {
    if (config.NODE_ENV !== 'production') {
      const webpack = require('webpack');
      const webpackDevMiddleware = require('webpack-dev-middleware');
      const webpackHotMiddleware = require('webpack-hot-middleware');

      const webpackConfig = require('../webpack.config.js');
      const webpackCompiler = webpack(webpackConfig);

      app.use(webpackHotMiddleware(webpackCompiler));
      app.use(webpackDevMiddleware(webpackCompiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true
        },
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        }
      }));
      // app.use(webpackDevMiddleware(webpackCompiler, {
      //   noInfo: true,
      //   publicPath: webpackConfig.output.publicPath
      // }));
    }
    return app;
  }

  function setupMongooseConnections() {
    mongoose.connect(config.MONGO_URL);

    mongoose.connection.on('connected', function() {
      // logger.debug('Mongoose is now connected to ', config.MONGO_URL);
    });

    mongoose.connection.on('error', function(err) {
      // logger.error('Error in Mongoose connection: ', err);
    });

    mongoose.connection.on('disconnected', function() {
      // logger.debug('Mongoose is now disconnected..!');
    });

    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        // logger.info(
        //   'Mongoose disconnected on process termination'
        // );
        process.exit(0);
      });
    });
  }

  // App Constructor function is exported
  module.exports = {
    createApp: createApp,
    setupStaticRoutes: setupStaticRoutes,
    setupRestRoutes: setupRestRoutes,
    setupMiddlewares: setupMiddlewares,
    setupMongooseConnections: setupMongooseConnections,
    setupWebpack: setupWebpack
  };
