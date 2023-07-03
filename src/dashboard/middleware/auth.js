export default function ({ store, redirect, route }) {
  // Check authentication status
  if (!store.state.auth.auth && route.name !== 'login') {
    return redirect('/login')
  }
}
