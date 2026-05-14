const Chart = require("chart.js/auto");

exports.initChart = (ctx, data, options) => new Chart(ctx, { type: "line", data, options });
