export function checkAndParse(response) {
  let json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json.then(err => {throw err;});
  }
}
