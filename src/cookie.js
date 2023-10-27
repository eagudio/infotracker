const getCookie = (cName) => {
  const name = `${cName}=`;
  const cDecoded = decodeURIComponent(document.cookie); // to be careful
  const cArr = cDecoded.split('; ');
  let res;

  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });

  return res;
};

const setCookie = (cName, cValue, expDays) => {
  const date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = `Expires=${date.toUTCString()}`;

  document.cookie = `${cName}=${JSON.stringify(cValue)}; ${expires}; Path=/; Domain=localhost; `;
};

export { getCookie, setCookie };
