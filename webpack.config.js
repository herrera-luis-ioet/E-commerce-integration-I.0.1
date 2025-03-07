const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // Entry point of the application
  entry: './src/index.tsx',
  
  // Output configuration
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isProduction 
      ? 'static/js/[name].[contenthash:8].js' 
      : 'static/js/[name].js',
    chunkFilename: isProduction 
      ? 'static/js/[name].[contenthash:8].chunk.js' 
      : 'static/js/[name].chunk.js',
    publicPath: '/',
    // Add asset module filename pattern for images and fonts
    assetModuleFilename: 'static/media/[name].[hash:8][ext]',
  },
  
  // Enable source maps for development
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  
  // Development server configuration
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  
  // Resolve file extensions
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
  // Module rules for processing different file types
  module: {
    rules: [
      // TypeScript and JavaScript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              isProduction && 'transform-react-remove-prop-types',
            ].filter(Boolean),
          },
        },
      },
      
      // CSS, PostCSS, and Sass
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          'postcss-loader',
        ],
      },
      
      // Images
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // Inline images smaller than 10kb
            maxSize: 10 * 1024,
          },
        },
      },
      
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  // Optimization configuration
  optimization: {
    minimize: isProduction,
    minimizer: [
      // JavaScript minification
      new TerserPlugin({
        terserOptions: {
          compress: {
            ecma: 5,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
      // CSS minification
      new CssMinimizerPlugin(),
    ],
    // Code splitting configuration
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        // Vendor chunk for node_modules
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20,
        },
        // Common chunk for shared code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    // Keep the runtime chunk separated to enable long term caching
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  
  // Plugins
  plugins: [
    // Clean the build folder before each build
    new CleanWebpackPlugin(),
    
    // Generate HTML file
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : undefined,
    }),
    
    // Extract CSS into separate files
    isProduction && new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    
    // Enable hot module replacement for React
    !isProduction && new webpack.HotModuleReplacementPlugin(),
    
    // Define environment variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
    }),
    
    // Compression for production builds
    isProduction && new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    
    // Bundle analyzer (disabled by default, enable with ANALYZE=true)
    process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  
  // Performance hints
  performance: {
    hints: isProduction ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};