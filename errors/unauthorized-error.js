class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.stausCode = 401;
  }
}

module.exports = UnauthorizedError;
