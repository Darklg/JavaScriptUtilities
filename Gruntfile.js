module.exports = function(grunt) {
    // Tasks
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'assets/js/mootools/classes/**/*.js',
                'assets/js/jquery/plugins/**/*.js',
                'assets/js/vanilla-js/libs/*.js',
                'assets/js/vanilla-js/plugins/*.js',
                '!assets/js/**/*.min.js',
            ],
        },
        uglify: {
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: [
                        'mootools/classes/**/*.js',
                        'jquery/plugins/**/*.js',
                        'vanilla-js/vanilla-js.js',
                        '!**/*.min.js',
                    ],
                    dest: 'assets/js/',
                    ext: '.min.js',
                }, ],
            },
        },
        watch: {
            scripts: {
                files: [
                    'assets/js/**/*.js',
                    'assets/css/**/*.css',
                    '!**/*.min.js',
                    '_includes/**/*.html',
                    '_includes/**.html',
                ],
                tasks: [
                    'jekyll:dev',
                    'jshint',
                ],
                options: {
                    interrupt: true,
                },
            },
        },
        concat: {
            options: {
                separator: "\n\n/*---*/\n\n",
            },
            dist: {
                src: [
                    'assets/js/vanilla-js/libs/*.js',
                    '!**/*.min.js'
                ],
                dest: 'assets/js/vanilla-js/vanilla-js.js'
            }
        },
        jekyll: {
            dev: {}
        },
        clean: ['**/.DS_Store', '**/thumbs.db'],
        shell: {
            postuglify: {
                command: 'rm assets/js/vanilla-js/vanilla-js.js;',
                stdout: true
            }
        }
    });
    grunt.registerTask('default', [
        'jshint',
        'concat',
        'uglify',
        'shell:postuglify',
        'jekyll:dev',
    ]);
};