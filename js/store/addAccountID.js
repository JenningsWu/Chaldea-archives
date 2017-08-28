export default store => next => action => (
  next({
    ...action,
    currentAccountID: store.getState().account,
  })
)
