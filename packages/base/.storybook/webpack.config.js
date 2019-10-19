const { getResolveAlias } = require('@fluentui/scripts/webpack/getResolveAlias');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: 'tsconfig.build.json',
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
  config.resolve.alias = getResolveAlias();

  return config;
};
