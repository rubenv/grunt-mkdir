assert = require('assert')
grunt = require('grunt')

describe 'mkdir', () ->
    it 'Should create "tmp"', ->
        assert(grunt.file.exists('tmp'))

    it 'Should create "tmp/a" and "tmp/b"', ->
        assert(grunt.file.exists('tmp/a'))
        assert(grunt.file.exists('tmp/b'))

    it 'Should create "tmp/c/d"', ->
        assert(grunt.file.exists('tmp/c'))
        assert(grunt.file.exists('tmp/c/d'))
