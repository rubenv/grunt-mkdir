module.exports = (grunt) ->
    grunt.registerMultiTask 'mkdir', 'Make directories.', () ->
        options = @options
            mode: undefined
            create: []

        grunt.verbose.writeflags(options, 'Options')

        # Create requested directories
        options.create.forEach (filepath) ->
            grunt.log.write('Creating "' + filepath + '"...')

            try
                filepath = grunt.template.process(filepath)
                grunt.file.mkdir(filepath, options.mode)
                grunt.log.ok()
            catch e
                grunt.log.error()
                grunt.verbose.error(e)
                grunt.fail.warn('Mkdir operation failed.')
