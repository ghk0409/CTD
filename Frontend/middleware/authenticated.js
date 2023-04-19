export default function ({ store, redirect, app }) {
    // 사용자가 이미 로그인한 경우 리다이렉트
    const token = app.$auth.getToken('local');
    if (store.state.auth.loggedIn && token !== undefined && token !== 'Bearer undefined') {
      return redirect('/');
    }
  }