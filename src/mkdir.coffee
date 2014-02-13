module.exports = (grunt) ->
    grunt.registerMultiTask 'mkdir', 'Make directories.', () ->
        fs = require('fs')
        posix = require('posix')
        
        getUid = =>
            if 'user' of @options()
                posix.getpwnam(@options().user).uid
            else
                process.getuid()
                
        getGid = =>
            if 'group' of @options()
                posix.getgrnam(@options().group).gid
            else
                process.getgid()
                
        options = @options
            mode: null,
            create: [],
            gid: getGid()
            uid: getUid()
            
        grunt.verbose.writeflags(options, 'Options')

        # Create requested directories
        options.create.forEach (filepath) ->
            grunt.log.write('Creating "' + filepath + '"...')

            try
                grunt.file.mkdir(filepath, options.mode)
                fs.chownSync(filepath, options.uid, options.gid)
                grunt.log.ok()
            catch e
                grunt.log.error()
                grunt.verbose.error(e)
                grunt.fail.warn('Mkdir operation failed.')
