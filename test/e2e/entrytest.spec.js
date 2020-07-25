/* eslint-disable no-undef */
'use strict';

const axios = require('axios');
const path = require('path');
const _config = require(path.join('..', '..', 'configs', 'default.json'));
const config = _config[process.env.NODE_ENV] || _config['development'];
const baseurl = config.protocol+'://'+config.host+':'+process.env.PORT;
const App = require('./../../index.js');

/*  Test */
describe('Test \'loginController\' ', () => {
  beforeAll(() => {});
  afterAll(() => {});

  describe('Test Entry Point', () => {
    let authtoken = '';
    test('Welcome should return with \'SUCCESS\'', (done) => {
      const url = baseurl+'/';
      axios.get(url)
          .then(function(response) {
            expect(response).toEqual(
                expect.objectContaining({
                  data: {
                    status: 200,
                    message: 'Welcome to Raw Express Boilerplate !',
                  },
                }));
            done();
          })
          .catch(function(error) {})
          .finally(function() {});
    }, 3000);
    test('Login should return with Authtoken and \'SUCCESS\'', (done) => {
      const url = baseurl+'/login';
      axios.post(url, {
        'username': 'abc123',
        'password': '!@#$%^',
      })
          .then(function(response) {
            expect(response.data).toHaveProperty('success', true);
            expect(response.data).toHaveProperty('authtoken');
            authtoken = response.data.authtoken;
            done();
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function(error) {
            console.log(error);
          });
    }, 3000);
    test('Get Users should return with User Data', (done) => {
      const url = baseurl+'/get-users';
      axios.post(url, {
        'authtoken': authtoken,
      })
          .then(function(response) {
            expect(response).toHaveProperty('status', 200);
            done();
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function(error) {
            console.log(error);
          });
    }, 3000);
  });
});

