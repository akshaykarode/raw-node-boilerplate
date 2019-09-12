"use strict"

const axios = require('axios');
const path = require('path');
const _config = require(path.join('..','..','configs','default.json'))
const config = _config[process.env.NODE_ENV] || _config['development'];
const baseurl = config.protocol+'://'+config.host+":"+process.env.PORT
const App = require('./../../index.js')
/*  Test */
describe("Test 'loginController' ", () => {

	beforeAll(() => {});
    afterAll(() => {});
    
    describe("Test Entry Point",  () => {
		test("Welcome should return with 'SUCCESS'", (done) => {
            let url = baseurl+'/'
            axios.get(url)
            .then(function (response) {
                expect(response).toEqual(
				    expect.objectContaining({ 
                        data:{
                            status: 200,
                            message: 'Welcome to Raw Express Boilerplate !'
                        }
                }));
                done();
            })
            .catch(function (error) {})
            .finally(function () {});
		},3000);
	});
});

