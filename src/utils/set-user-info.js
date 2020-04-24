/* globals, window, rg4js */

// import * as Sentry from '@sentry/browser';
import UserService from 'services/user-service';

export default function setUserInfo() {
  if (UserService.isUserAvailable()) {
    const user = UserService.getUser();
    const { id } = user || {};
    // const { email, name, phone_number, user_type } = user.attributes || {};

    // Sentry.configureScope(scope => {
    //   scope.setUser({
    //     id,
    //     username: name,
    //     email,
    //     number: phone_number,
    //     userType: user_type
    //   });
    // });

    if (window.gtag) {
      window.gtag('set', { user_id: id });
    }

    // if (window.smartlook) {
    //   window.smartlook('tag', 'email', email);
    //   window.smartlook('tag', 'name', name);
    //   window.smartlook('tag', 'user_id', id);
    //   window.smartlook('tag', 'organization', organization.name);
    // }

    // if (window.analytics) {
    //   window.analytics.identify(user.email, {
    //     id,
    //     email,
    //     name,
    //     organization
    //   });
    // }
  }
}
