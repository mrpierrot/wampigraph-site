module.exports = function (grunt) {

    // globs where our JS files are found - used below in uglify and watch
    var jsFilePaths = [
        'js/*.js',
        'js/app/*.js',
        'js/app/modules/*.js'
    ];

    // main conf
    var appDir = 'resources/web';
    var builtDir = 'web/assets';

    // less conf
    var lessPaths = [
        '<%= appDir %>/css',
        '<%= appDir %>/vendor/components-bootstrap/less'

    ];
    var lessFiles = {
        '<%= appDir %>/css/global.css': 'resources/less/global.less'
    };

    // Load tasks from our external plugins. These are what we're configuring above
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.renameTask('bower','requirejs');
    grunt.loadNpmTasks('grunt-composer');
    grunt.loadNpmTasks('grunt-shell');

    // Project configuration
    grunt.initConfig({
        // you can read in JSON files, which are then set as objects. We use this below with banner
        pkg: grunt.file.readJSON('package.json'),

        // setup some variables that we'll use below
        appDir: appDir,
        builtDir: builtDir,
        requirejs: {
            all:{
                rjsConfig: '<%= appDir %>/js/config.js'
            }
        },

        shell:{
          'bower-install':{
              command: 'bower install'
          }
        },

        composer : {
            options:{
              usePhp: false
            }
        },

        uglify: {
            options: {
                // a cute way to put a banner on each uglified file
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                /*
                 * I'm not sure if finding files recursively is possible. This is
                 * a bit ugly, but it accomplishes the task of finding all files
                 * in the built directory (that we want) and uglifying them.
                 *
                 * Additionally, I created a little self-executing function
                 * here so that I could re-use the jsFilePaths from above
                 *
                 * https://github.com/gruntjs/grunt-contrib-uglify/issues/23
                 */
                files: (function() {

                    var files = [];
                    jsFilePaths.forEach(function(val) {
                        files.push({
                            expand: true,
                            cwd: '<%= builtDir %>',
                            src: val,
                            dest: '<%= builtDir %>'
                        });
                    });

                    return files;
                })()
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= appDir %>/js/{,*/}*.js'
            ]
        },


        less: {
            dev: {
                options: {
                    paths: lessPaths
                },
                files: lessFiles
            },
            prod: {
                options: {
                    paths: lessPaths,
                    cleancss: true,
                    modifyVars: {

                    }
                },
                files: lessFiles
            }
        },
        copy:{
            css:{
                files: [
                    {expand: true, cwd:'<%= appDir %>/', src: ['css/**'], dest: '<%= builtDir %>'}
                ]
            },
            main:{
                files: [
                    {expand: true, cwd:'<%= appDir %>/', src: ['css/**'], dest: '<%= builtDir %>'},
                    {expand: true, cwd:'<%= appDir %>/', src: ['js/**'], dest: '<%= builtDir %>'},
                    {expand: true, cwd:'<%= appDir %>/', src: ['fonts/**'], dest: '<%= builtDir %>'},
                    {expand: true, cwd:'<%= appDir %>/', src: ['images/**'], dest: '<%= builtDir %>'}
                ]
            },
            vendor:{
                files: [
                    {expand: true, cwd:'<%= appDir %>/', src: ['vendor/**'], dest: '<%= builtDir %>'}
                ]
            }
        },
        clean: {
            build: {
                src: ['<%= builtDir %>/**']
            }
        },

        // run "Grunt watch" and have it automatically update things when files change
        watch: {
            // watch all JS files and run jshint
           /* scripts: {
                // self executing function to reuse jsFilePaths, but prefix each with appDir
                files: (function() {
                    var files = [];
                    jsFilePaths.forEach(function(val) {
                        files.push('<%= appDir %>/'+val);
                    });

                    return files;
                })(),
                tasks: ['jshint','copy:main'],
                options: {
                    spawn: false
                }
            },*/
            // watch all .less files and run less
            less: {
                files: 'resources/less/**.less',
                tasks: ['less:dev','copy:css'],
                options: {
                    spawn: false
                }
            },
            sync:{
                files: ['<%= appDir %>/**'],
                tasks: ['copy:main'],
                options: {

                }
            }
        }

    });
/*
    grunt.event.on('watch', function(action, filepath,target) {
        console.log(action,filepath,target);
       // grunt.config('jshint.all.src', filepath);
        switch (target){
            case 'sync':
                grunt.task.run('copy')

                break;
        }
    });
*/
    // the "default" task (e.g. simply "Grunt") runs tasks for development
    grunt.registerTask('default', ['jshint', 'less:dev','clean-build']);
    grunt.registerTask('install', ['composer:install', 'shell:bower-install','requirejs','copy']);
    grunt.registerTask('clean-build', ['clean:build', 'requirejs','copy']);

    // register a "production" task that sets everything up before deployment
    grunt.registerTask('prod', ['jshint', 'clean-build', 'uglify', 'less:prod']);
};