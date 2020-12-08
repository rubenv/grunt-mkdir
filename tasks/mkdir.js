module.exports = function(grunt) {
  return grunt.registerMultiTask('mkdir', 'Make directories.', function() {
    var options;
    options = this.options({
      mode: void 0,
      create: []
    });
    grunt.verbose.writeflags(options, 'Options');
    return options.create.forEach(function(filepath) {
      var e;
      grunt.log.write('Creating "' + filepath + '"...');
      try {
        filepath = grunt.template.process(filepath);
        grunt.file.mkdir(filepath, options.mode);
        return grunt.log.ok();
      } catch (_error) {
        e = _error;
        grunt.log.error();
        grunt.verbose.error(e);
        return grunt.fail.warn('Mkdir operation failed.');
      }
    });
  });
};
