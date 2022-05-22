class AppError {
  where;
  messages;
  detail;
  params;
  code;
  constructor(where, messages, detail, params, code) {
    this.where = where; //
    this.messages = messages;
    this.detail = detail;
    this.params = params;
    this.code = code;
  }
}
