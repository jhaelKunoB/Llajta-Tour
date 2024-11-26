module.exports = {
    resolve: {
      fallback: {
        // Asegúrate de que los recursos están disponibles en la web
        crypto: require.resolve('crypto-browserify'),
        // Puedes agregar otros módulos que necesiten polifill
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash].[ext]',
              },
            },
          ],
        },
      ],
    },
  };
  