module.exports = function(grunt) {
    // Tasks
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Project configuration.
    grunt.initConfig({
        uglify: {
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: [
                        'mootools/classes/**/*.js',
                        'jquery/plugins/**/*.js',
                        'vanilla-js/*.js',
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
                    '!**/*.min.js'
                ],
                tasks: ['shell:jekyll'],
                options: {
                    interrupt: true,
                },
            },
        },
        shell: {
            jekyll: {
                command: 'rm -rf _ghpages/; jekyll build;',
                stdout: true
            }
        },
    });
    grunt.registerTask('default', ['uglify','shell:jekyll']);
};