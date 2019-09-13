"use strict"

var Util = require('../../modules/domain/users/util.js')

/*  Test */
describe("Test 'Util' ", () => {

	beforeAll(() => {});
    afterAll(() => {});
    
    describe("Test Module : Util",  () => {
		test("Positive case should return with Count", (done) => {
            expect(Util.calculateUsers(5,15)).toEqual(20);
            done();
        },3000);
        test("Unexpected case should return with Error", (done) => {
            expect(()=>Util.calculateUsers(null,15)).toThrow(new Error('wrong inputs'));
            expect(()=>Util.calculateUsers(5,null)).toThrow(new Error('wrong inputs'));
            expect(()=>Util.calculateUsers('',15)).toThrow(new Error('wrong inputs'));
            expect(()=>Util.calculateUsers(5,'')).toThrow(new Error('wrong inputs'));
            expect(()=>Util.calculateUsers(undefined,15)).toThrow(new Error('wrong inputs'));
            expect(()=>Util.calculateUsers(5,undefined)).toThrow(new Error('wrong inputs'));
            expect(()=>Util.calculateUsers(undefined)).toThrow(new Error('wrong inputs'));
            expect(()=>Util.calculateUsers()).toThrow(new Error('wrong inputs'));
            done();
        },3000);
        
	});
});

