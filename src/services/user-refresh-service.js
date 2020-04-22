import { get } from 'lodash';
import UserAPI from 'api/user';
import UserService from './user-service';

const userRefreshService = {
  refreshUserObject: function (callback) {
    UserAPI.get()
      .then(res => {
        const userData = get(res, 'body.data') || {};
        const user = Object.assign({}, userData);
        UserService.setUser(user);
        callback && callback(user);
      })
      .done();
  }
};

export default userRefreshService;
