/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Dsr) {
  const dsrRouter = express.Router();
  dsrRouter.route('/dsr')
    .post((req, res) => {
      const dsr = new Dsr(req.body);

      dsr.save();
      return res.status(201).json(dsr);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.rsrc) {
        query.rsrc = req.query.rsrc;
      }
      Dsr.find(query, (err, dsrs) => {
        if (err) {
          return res.send(err);
        }
        return res.json(dsrs);
      });
    });
  // Middle to findDsrById
  dsrRouter.use('/dsr/:dsrId', (req, res, next) => {
    Dsr.findById(req.params.dsrId, (err, dsr) => {
      if (err) {
        return res.send(err);
      }
      if (dsr) {
        req.dsr = dsr;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  dsrRouter.route('/dsr/:dsrId')
    .get((req, res) => res.json(req.dsr))
    .put((req, res) => {
      const { dsr } = req;
      dsr.rsrc = req.body.rsrc;
      dsr.tid = req.body.tid;
      dsr.ttitle = req.body.ttitle;
      dsr.status = req.body.status;
      dsr.comments = req.body.comments;
      req.dsr.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(dsr);
      });
    })
    .patch((req, res) => {
      const { dsr } = req;
      // eslint-disable-nect-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-nect-line no-underscore-dangle
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        dsr[key] = value;
      });
      req.dsr.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(dsr);
      });
    })
    .delete((req, res) => {
      req.dsr.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return dsrRouter;
}

module.exports = routes;