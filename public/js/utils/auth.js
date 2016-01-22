module.exports = {
  login(user, cb) {
    cb = arguments[arguments.length - 1]
    // if (user.auth) {
    //   if (cb) cb(true)
    //   this.onChange(true)
    //   return
    // }
    // this.onChange(true)
    localStorage.user = user;
  },

  getToken() {
    return localStorage.user
  },

  logout(cb) {
    delete localStorage.user
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.user
  },

  onChange() {}
}

// function pretendRequest(email, pass, cb) {
//   setTimeout(() => {
//     if (email === 'joe@example.com' && pass === 'password1') {
//       cb({
//         authenticated: true,
//         token: Math.random().toString(36).substring(7)
//       })
//     } else {
//       cb({ authenticated: false })
//     }
//   }, 0)
// }