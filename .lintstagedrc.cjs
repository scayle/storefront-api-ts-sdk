module.exports = {
  // Run `dprint` on all staged files that will not be covered by `eslint`.
  // This is done, do avoid race conditions due to lint-staged task concurrency.
  // https://github.com/okonet/lint-staged#task-concurrency
  '*{json,md}': ['yarn dprint fmt --verbose'],
  // Run first `dprint`, followed by `eslint` on all relevant files.
  // This takes care of first formatting and then applying linting fixes to files.
  // TODO: Re-enable this when dprint is fully implemented in v17
  // '*{cjs,mjs,js,ts}': ['yarn dprint fmt', 'yarn eslint --fix'],
}
