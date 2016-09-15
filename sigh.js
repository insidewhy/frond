var glob, babel, write, pipeline, mocha

module.exports = function(pipelines) {
  var babelOpts = {
    presets: [[ 'es2015', { loose: true }], 'stage-2']
  }

  pipelines.build = [
    glob({ basePath: 'src' }, '*.js'),
    babel(babelOpts),
    write('.')
  ]

  pipelines['run-tests'] = [
    pipeline('build'),
    pipeline({ activate: true }, 'mocha')
  ]

  pipelines.explicit.mocha = [ mocha({ files: '*.spec.js' }) ]
}
