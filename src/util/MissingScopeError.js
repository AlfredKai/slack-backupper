class MissingScopeError extends Error {
  constructor(needed, provided) {
    super('missing scope');
    this.name = 'MissingScopeError';
    this.needed = needed;
    this.provided = provided;
  }
}

module.exports = MissingScopeError;
