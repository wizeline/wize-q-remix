export function setCookie(name, value) {
  document.cookie = `${name}=${value}`;
}

export function getCookie(name) {
  if (typeof window !== 'undefined') {
    // your code with access to window or document object here
    const cname = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
  }

  return '';
}
