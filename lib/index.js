'use strict';
import Services from './services';

let _ = require('lodash');
let request = require('request');

let config = {};
let params = {};

const ConfigKeys = [
  'host',
  'service',
  'division',
  'season',
  'tournament'
];

function buildQs (options, callback) {
  _.assign(params, options);
  return apiRequest(params, callback);
}

function apiRequest (api, callback) {
  let options = {
    uri: config.service,
    baseUrl: config.host,
    method: 'GET',
    qs: api,
    json: true,
  };

  return request.get(options, callback);
}

let Api = {
  init (opts) {
    ConfigKeys.forEach(function (param) {
      if (!opts.hasOwnProperty(param)) {
        throw new Error('missing config:' + param);
      }
    });

    config = opts;
    params = {
      objIDDivision: config.division,
      objIDTemporada: config.season,
      objIDTorneo: config.tournament
    };
  },

  stats (callback) {
    let options = {
      psWidget: Services.STATS,
    };
    return buildQs(options, callback);
  },

  top (callback) {
    let options = {
      psWidget: Services.TOP,
      objTipo: Services.LEADER
    };
    return buildQs(options, callback);
  },

  relegation (callback) {
    let options = {
      psWidget: Services.RELEGATION
    };
    return buildQs(options, callback);
  },

  strikers (callback) {
    let options = {
      psWidget: Services.STRIKERS,
      objTOP: 10
    };
    return buildQs(options, callback);
  },

  fairPlay (callback) {
    let options = {
      psWidget: Services.FAIRPLAY,
    };
    return buildQs(options, callback);
  },

  defense (callback) {
    let options = {
      psWidget: Services.DEFENSE,
    };
    return buildQs(options, callback);
  },

  offense (callback) {
    let options = {
      psWidget: Services.OFFENSE,
    };
    return buildQs(options, callback);
  },

  results (fixtureId, callback) {
    let options = {
      psWidget: Services.RESULTS,
      objIdJornada: fixtureId
    };
    return buildQs(options, callback);
  },

  goalTimeRangeByFixture (fixtureId, callback) {
    let options = {
      psWidget: Services.GOALS_PER_TIME_RANGE,
      objIdJornada: fixtureId,
      objFase: 1
    };
    return buildQs(options, callback);
  },

  goalTimeRangeByTeam (teamId, callback) {
    let options = {
      psWidget: Services.GOALS_PER_TIME_RANGE,
      objIDClub: teamId,
      objFase: 1
    };
    return buildQs(options, callback);
  },

  videos (gameId, callback) {
    let options = {
      psWidget: Services.VIDEOS,
      objIdPartido: gameId,
      objIdEvento: 1
    };
    return buildQs(options, callback);
  }

};

export default Api;
