const getCookie = (cName) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;

  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })

  return res;
}

const setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "Expires=" + date.toUTCString();
  document.cookie = cName + "=" + JSON.stringify(cValue) + "; " + expires + "; Path=/; Domain=.start2impact.it; ";
}

export const setUtmCookie = () => {
  let cName = 'utm_parameters';
  let url = new URL(window.location);
  let search_params = url.searchParams;
  let utm_campaign = search_params.get('utm_campaign');
  let utm_medium = search_params.get('utm_medium');
  let utm_source = search_params.get('utm_source');
  let expDays = 30;
  let landed_at = new Date().toLocaleString(); //.toString();
  let referrer_url = document.referrer;

  let cValue = { utm_campaign, utm_medium, utm_source, landed_at, referrer_url };

  if (utm_campaign || utm_medium || utm_source) {
    if (!(utm_campaign && utm_medium && utm_source)) {
      console.warn('UTM parameters missing:', { utm_campaign, utm_medium, utm_source });
    }

    const cookie = getCookie(cName);

    if (cookie) {
      let existingCookieValue = JSON.parse(cookie);

      if (existingCookieValue) {
        existingCookieValue.push(cValue);

        setCookie(cName, existingCookieValue, expDays);
      } else {
        setCookie(cName, [cValue], expDays);
      }
    }
    
    return true;
  }

  return false;
}
