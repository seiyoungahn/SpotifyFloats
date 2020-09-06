module.exports = function exportAuthCode(authURL) {
  const code = "?code=";
  const codePos = authURL.indexOf(code);
  if (codePos === -1) {
    return null;
  } else {
    return authURL.slice(codePos + code.length, codePos.length);
  }
}