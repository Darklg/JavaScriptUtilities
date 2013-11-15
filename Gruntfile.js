module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'assets/js/vanilla-js/vanilla-js-dk-jsu.min.js': ['assets/js/vanilla-js/vanilla-js-dk-jsu.js']
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'assets/js/**/*.js', '!assets/js/**/*.min.js'
                ],
                tasks: ['uglify'],
                options: {
                    interrupt: true,
                },
            },
        },
    });
    // Tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};