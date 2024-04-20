module.exports = {
  logs: {
    host: 'http-intake.logs.datadoghq.com',
    path: `/v1/input/${process.env.DATADOG_API_KEY}?ddsource=nodejs`,
  },
};