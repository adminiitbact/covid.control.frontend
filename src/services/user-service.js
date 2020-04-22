const sessionKey = 'cov-admin-user-token';

const userService = {
  isUserAvailable: function() {
    const sessionId = localStorage.getItem(sessionKey);
    return !!sessionId;
  },
  setUserSessionId: function(sessionId) {
    localStorage.setItem(sessionKey, sessionId);
  },
  getUserSessionId: function() {
    return localStorage.getItem(sessionKey);
  },
  deleteUserSessionId: function() {
    localStorage.removeItem(sessionKey);
  },
  setUser: function(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser: function() {
    return JSON.parse(localStorage.getItem('user'));
  },
  deleteUser: function() {
    localStorage.removeItem('user');
  },
  logoutUser: function() {
    this.deleteUser();
    this.deleteUserSessionId();
  }
};

export default userService;
