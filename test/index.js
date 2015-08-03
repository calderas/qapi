'use strict';
import assert from 'assert';
import qApi from '../lib';

let request = require('request');
let sinon = require('sinon');
let _ = require('lodash');
let nock = require('nock');

let params;
let requestSpy;
let expected;
let config;

function fakeServer () {
  nock(config.host)
    .get(config.service)
    .query(true)
    .reply(200, {ok: true});
}

function getExpected () {
  return {
    baseUrl: config.host,
    uri: config.service,
    qs: {
      objIDDivision: config.division,
      objIDTemporada: config.season,
      objIDTorneo: config.tournament
    }
  };
}

function assertApi (expected) {
  let payload = request.get.args[0][0];
  assert.ok(request.get.calledOnce);
  assert.equal(payload.url, expected.url);
  assert.deepEqual(payload.qs, expected.qs);
  assert.equal(payload.json, true);
}

describe('qApi', function () {
  beforeEach(function () {
    config = {
      host: 'http://test.com',
      service: '/api',
      division: 1,
      season: 1,
      tournament: 1
    };
    qApi.init(config);

    fakeServer();
    expected = getExpected();
    requestSpy = sinon.spy(request, 'get');
  });

  afterEach(function () {
    requestSpy.restore();
  });

  it('should validate config', function () {
    assert.throws(function () {
      qApi.init();
    }, Error);
  });

  it('should query stats', function () {
    _.extend(expected.qs, {psWidget: 'PRTL_EstdClubDtll'});

    qApi.stats();
    assertApi(expected);
  });

  it('should query top', function () {
    qApi.top();
    _.extend(expected.qs, {
      psWidget: 'PRTL_LIGA_MosaicoEstadistica',
      objTipo: 'LiderTorneo'
    });
    assertApi(expected);
  });

  it('should query releagtion', function () {
    qApi.relegation();
    _.extend(expected.qs, {psWidget: 'PRTL_Cociente'});
    assertApi(expected);
  });

  it('should query strikers', function () {
    qApi.strikers();
    _.extend(expected.qs, {
      psWidget: 'PRTL_GleoIndv',
      objTOP:10
    });
    assertApi(expected);
  });

  it('should query fair play', function () {
    qApi.fairPlay();
    _.extend(expected.qs, {
      psWidget: 'PRTL_FairPlay'
    });
    assertApi(expected);
  });

  it('should query defense', function () {
    qApi.defense();
    _.extend(expected.qs, {
      psWidget: 'PRTL_Defensiva'
    });
    assertApi(expected);
  });

  it('should query offense', function () {
    qApi.offense();
    _.extend(expected.qs, {
      psWidget: 'PRTL_Ofensiva'
    });
    assertApi(expected);
  });

  it('should query results', function () {
    const fixtureId = 1;
    qApi.results(fixtureId);
    _.extend(expected.qs, {
      psWidget: 'PRTL_Marcador',
      objIdJornada: fixtureId
    });
    assertApi(expected);
  });
});
