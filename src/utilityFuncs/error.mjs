function error(status, msg) {
  const err = new Error(msg);
  err.status = status;
  return err;
}

export default error;
