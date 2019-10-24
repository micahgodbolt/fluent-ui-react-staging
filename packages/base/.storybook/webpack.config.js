module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: 'tsconfig.json',
          compilerOptions: {
            composite: false
          }
        }
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
