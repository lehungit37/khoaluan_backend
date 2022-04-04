class AppError {
  where;
  message;
  detail;
  params;
  code;
  constructor(where, message, detail, params, code) {
    this.where = where; //
    this.message = message;
    this.detail = detail;
    this.params = params;
    this.code = code;
  }
}
