module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            min: {
                src: '&lt;%= pkg.name %>.js',
                dest: '&lt;%= pkg.name %>.min.js'
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-uglify');
 
    grunt.registerTask('default', ['uglify']);