import Navigo from 'navigo';
import Home from '../views/pages/home';
import TourPackage from '../views/pages/tour-package';
import TourHistory from '../views/pages/tour-history';

window.addEventListener('load', () => {
  const router = new Navigo('/');
  const render = (content) => {
    document.querySelector('#app').innerHTML = content;
  };
  router
    .on('/tour-history', () => {
      render(TourHistory());
    })
    .on('/tour-package', () => {
      render(TourPackage());
    })
    .on(() => {
      render(Home());
    })
    .resolve();
});
