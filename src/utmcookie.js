import { getCookie, setCookie } from './cookie';

const getUtmParams = () => {
  const url = new URL(window.location);
  const { searchParams } = url;

  const utmCampaign = searchParams.get('utm_campaign');
  const utmMedium = searchParams.get('utm_medium');
  const utmSource = searchParams.get('utm_source');

  return {
    utm_campaign: utmCampaign,
    utm_medium: utmMedium,
    utm_source: utmSource,
  };
};

const setUtmCookie = (cName, cValue, expDays) => {
  const cookie = getCookie(cName);

  if (cookie) {
    const existingCookieValue = JSON.parse(cookie);

    if (existingCookieValue) {
      existingCookieValue.push(cValue);

      setCookie(cName, existingCookieValue, expDays);
    }
  } else {
    setCookie(cName, [cValue], expDays);
  }
};

const getUtmCookie = (cName) => {
  const cookie = getCookie(cName);

  if (cookie) {
    return JSON.parse(cookie);
  }

  return null;
};

const trackUtmParams = () => {
  const cName = 'utm_parameters';
  const expDays = 30;
  const landedAt = new Date().toLocaleString(); // .toString();
  const referrerUrl = document.referrer;
  const cValue = {
    ...getUtmParams(),
    landed_at: landedAt,
    referrer_url: referrerUrl,
  };

  if (cValue.utm_campaign || cValue.utm_medium || cValue.utm_source) {
    if (!(cValue.utm_campaign && cValue.utm_medium && cValue.utm_source)) {
      console.warn('UTM parameters missing:', cValue);
    }

    setUtmCookie(cName, cValue, expDays);
  }

  return getUtmCookie(cName);
};

export default trackUtmParams;
