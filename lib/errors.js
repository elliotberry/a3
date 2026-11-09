/**
Machine-readable error codes thrown by a3.
Match on `error.code` rather than on the message text.
*/
const ErrorCodes = Object.freeze({
  INVALID_ADJECTIVE_COUNT: 'INVALID_ADJECTIVE_COUNT',
  INVALID_SEED: 'INVALID_SEED',
  UNSUPPORTED_FORMAT: 'UNSUPPORTED_FORMAT',
});

/**
Structured error for invalid input.

- `code`: one of {@link ErrorCodes}
- `message`: human-readable description
- `details`: extra context, always a plain JSON-serializable object
  (e.g. the offending `value` and the `expected` constraint)
*/
class A3Error extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'A3Error';
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {code: this.code, details: this.details, message: this.message, name: this.name};
  }
}

export {A3Error, ErrorCodes};
