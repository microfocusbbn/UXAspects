// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { cwd } = require('process');
const { ContextReplacementPlugin } = require('webpack');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-jasmine-html-reporter'),
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true,
        files: [
            'src/karma-test-shim.ts'
        ],
        preprocessors: {
            'src/karma-test-shim.ts': ['webpack']
        },
        webpack: {
            mode: 'development',
            resolve: {
                extensions: ['.ts', '.js']
            },
            module: {
                rules: [
                    {
                        test: /\.html$/,
                        use: 'raw-loader'
                    },
                    {
                        test: /\.ts$/,
                        use: [
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    configFileName: join(cwd(), 'src', 'tsconfig-build.json')
                                },
                            },
                            {
                                loader: 'angular2-template-loader'
                            }
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: ['raw-loader', 'less-loader']
                    },
                    // Ignore warnings about System.import in Angular
                    {
                        test: /[\/\\]@angular[\/\\].+\.js$/,
                        parser: { system: true }
                    }
                ]
            },
            plugins: [
                new ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, join(cwd(), 'src')),
            ]
        },
    });
};