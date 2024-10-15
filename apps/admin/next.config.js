//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { resolve } = require('path');

const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // Based on this: https://discord.com/channels/1143497901675401286/1224694434189414410
  webpack: (config, { dev, isServer }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        rule.oneOf.forEach((oneOfRule) => {
          if (
            oneOfRule.test &&
            oneOfRule.test.toString().includes('.css$') &&
            oneOfRule.use &&
            Array.isArray(oneOfRule.use)
          ) {
            oneOfRule.exclude = [
              ...(oneOfRule.exclude || []),
              /packages\/(.*)\/src\/*\.css/, // Exclude file(s)
            ];
          }
        });
      }
    });

    let regExp = /packages\/(.*)\/src\/(.*)\.css/;

    config.module.rules.push({
      test: regExp,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            postcssOptions: (loaderContext) => {

              const pathMatch = loaderContext.resourcePath.match(regExp);

              if (!pathMatch) {
                return {};
              }
              const tailwindConfigPath = resolve(
                __dirname,
                `../../packages/${pathMatch[1]}/tailwind.config.js`
              );
              return {
                plugins: [
                  postcssImport({
                    path: [
                      resolve(__dirname, `../../packages/${pathMatch[1]}`),
                    ],
                  }),
                  tailwindcss(tailwindConfigPath),
                  autoprefixer(),
                ],
              };
            },
          },
        },
      ],
    });

    // if (!dev) {
    //   if (!config.plugins) {
    //     config.plugins = [];
    //   }
    //
    // config.plugins.push(
    //   new MiniCssExtractPlugin({
    //     filename: 'static/css/[name].[contenthash].css',
    //     chunkFilename: 'static/css/[name].[contenthash].css',
    //   })
    // );
    // }

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
