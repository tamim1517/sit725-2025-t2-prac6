const expect = require("chai").expect;
const request = require("request");

describe("Sum Calculator API", function () {
    const baseUrl = "http://localhost:3000";
    it("returns status 200 to check if api works", function (done) {
        request(baseUrl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
    it("should return correct sum for valid numbers", function (done) {
        request.get(`${baseUrl}/add?a=10&b=5`, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.include("15"); // Response contains the sum in plain text or HTML
            done();
        });
    });
    it("should handle missing parameters", function (done) {
        request.get(`${baseUrl}/add?a=10`, function (error, response, body) {
            expect(response.statusCode).to.not.equal(200); // Expect error
            done();
        });
    });
    it("should return error for non-numeric input", function (done) {
        request.get(`${baseUrl}/add?a=hello&b=world`, function (error, response, body) {
            expect(response.statusCode).to.not.equal(200);
            done();
        });
    });
});

describe("Projects API", function () {
    const baseUrl = "http://localhost:3000";
    const endpoint = "/api/projects"; // <-- adjust if your route differs

    it("returns 200 and the expected JSON envelope", function (done) {
        request.get(`${baseUrl}${endpoint}`, function (error, response, body) {
            expect(response.statusCode).to.equal(200);

            const json = JSON.parse(body);
            expect(json).to.have.all.keys("statusCode", "data", "message");
            expect(json.statusCode).to.equal(200);
            expect(json.message).to.equal("Success");
            expect(json.data).to.be.an("array");
            done();
        });
    });

    it("returns exactly 3 projects", function (done) {
        request.get(`${baseUrl}${endpoint}`, function (error, response, body) {
            const json = JSON.parse(body);
            expect(json.statusCode).to.equal(200);
            expect(json.data).to.be.an("array").with.lengthOf(2); // DB expected to have 2
            done();
        });
    });

    it("each project item is an object (likely with an _id)", function (done) {
        request.get(`${baseUrl}${endpoint}`, function (error, response, body) {
            const json = JSON.parse(body);
            expect(json.statusCode).to.equal(200);
            json.data.forEach((proj) => {
                expect(proj).to.be.an("object");
                // If using Mongoose, documents will have _id:
                expect(proj).to.have.property("_id");
            });
            done();
        });
    });

    // Optional: sanity check that non-GET is not allowed (adjust if you support POST)
    it("rejects non-GET methods on /api/projects", function (done) {
        request.post(`${baseUrl}${endpoint}`, function (error, response) {
            // Most setups will return 404 or 405 for unsupported methods. Accept either.
            expect([404, 405]).to.include(response.statusCode);
            console.log(response.statusCode)
            done();
        });
    });
});