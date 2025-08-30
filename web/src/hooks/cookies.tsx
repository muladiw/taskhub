import Cookies from 'universal-cookie';
export function useCookies() {
  return new Cookies(null, { path: '/' });
}
