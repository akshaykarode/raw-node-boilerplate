module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "jest",
    transpilers: [],
    mutate: [
      "modules/domain/users/util.js"
    ],
    coverageAnalysis: "off"
    // logLevel: 'debug'
  });
};
