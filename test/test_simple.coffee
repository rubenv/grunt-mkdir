fs = require('fs')
assert = require('assert')
grunt = require('grunt')

describe 'mkdir', () ->
    it 'Should create "tmp"', ->
        assert(grunt.file.isDir('tmp'))

    it 'Should create "tmp/a" and "tmp/b"', ->
        assert(grunt.file.isDir('tmp/a'))
        assert(grunt.file.isDir('tmp/b'))

    it 'Should create "tmp/c/d"', ->
        assert(grunt.file.isDir('tmp/c'))
        assert(grunt.file.isDir('tmp/c/d'))

    it 'Should create "tmp/e" and set the mode', ->
        assert(grunt.file.isDir('tmp/e'))
        stats = fs.statSync('tmp/e')
        assert.equal(stats.mode & 0o777, 0o700)
