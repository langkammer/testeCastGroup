const proxy = [
    {
      context: '/',
      target: 'http://localhost:9000',
      pathRewrite: {'^/' : ''}
    }
  ];

module.exports = proxy;
