module.exports = function(grunt) {
  return grunt.registerMultiTask('mkdir', 'Make directories.', function() {
    var fs, getGid, getUid, options, posix,
      _this = this;
    fs = require('fs');
    posix = require('posix');
    getUid = function() {
      if ('user' in _this.options()) {
        return posix.getpwnam(_this.options().user).uid;
      } else {
        return process.getuid();
      }
    };
    getGid = function() {
      if ('group' in _this.options()) {
        return posix.getgrnam(_this.options().group).gid;
      } else {
        return process.getgid();
      }
    };
    options = this.options({
      mode: null,
      create: [],
      gid: getGid(),
      uid: getUid()
    });
    grunt.verbose.writeflags(options, 'Options');
    return options.create.forEach(function(filepath) {
      var e;
      grunt.log.write('Creating "' + filepath + '"...');
      try {
        grunt.file.mkdir(filepath, options.mode);
        fs.chownSync(filepath, options.uid, options.gid);
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
