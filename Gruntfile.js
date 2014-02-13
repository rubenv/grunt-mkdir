module.exports = function(grunt) {
  this.initConfig({
    coffee: {
      all: {
        options: {
          bare: true
        },
        expand: true,
        cwd: 'src',
        src: ['*.coffee'],
        dest: 'tasks',
        ext: '.js'
      }
    },
    clean: {
      all: ['tasks', 'tmp']
    },
    mkdir: {
      noop: {},
      simple: {
        options: {
          create: ['tmp']
        }
      },
      multiple: {
        options: {
          create: ['tmp/a', 'tmp/b']
        }
      },
      deep: {
        options: {
          create: ['tmp/c/d']
        }
      },
      mode: {
        options: {
          mode: 0700,
          create: ['tmp/e']
        }
      },
      group: {
        options: {
          mode: 0770,
          group: 'http',
          create: ['tmp/f']
        }
      },
      owner: {
        options: {
          user: 'git',
          group: 'http',
          create: ['tmp/f']
        }
      }
    },
    watch: {
      all: {
        files: ['src/**.coffee', 'test/**.coffee'],
        tasks: ['test']
      }
    },
    mochacli: {
      options: {
        files: 'test/*_test.coffee',
        compilers: ['coffee:coffee-script']
      },
      spec: {
        options: {
          reporter: 'spec'
        }
      }
    }
  });

  this.loadNpmTasks('grunt-contrib-clean');
  this.loadNpmTasks('grunt-contrib-coffee');
  this.loadNpmTasks('grunt-contrib-watch');
  this.loadNpmTasks('grunt-mocha-cli');
  this.loadTasks('tasks');

  this.registerTask('default', ['test']);
  this.registerTask('build', ['clean', 'coffee']);

  return this.registerTask('test', ['build', 'mkdir', 'mochacli']);
};
