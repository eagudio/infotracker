import { getCookie, setCookie } from './cookie';

const setUtmCookie = () => {
  const cName = 'utm_parameters';
  const url = new URL(window.location);
  const { searchParams } = url;
  const utmCampaign = searchParams.get('utm_campaign');
  const utmMedium = searchParams.get('utm_medium');
  const utmSource = searchParams.get('utm_source');
  const expDays = 30;
  const landedAt = new Date().toLocaleString(); // .toString();
  const referrerUrl = document.referrer;

  const cValue = {
    utm_campaign: utmCampaign,
    utm_medium: utmMedium,
    utm_source: utmSource,
    landed_at: landedAt,
    referrer_url: referrerUrl,
  };

  if (utmCampaign || utmMedium || utmSource) {
    if (!(utmCampaign && utmMedium && utmSource)) {
      console.warn('UTM parameters missing:', { utm_campaign: utmCampaign, utm_medium: utmMedium, utm_source: utmSource });
    }

    const cookie = getCookie(cName);

    if (cookie) {
      const existingCookieValue = JSON.parse(cookie);

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
};

export default setUtmCookie;
