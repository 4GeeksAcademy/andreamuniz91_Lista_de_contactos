const { store } = useContext(Context)

return (
  <div className={`alert alert-${store.alert.back} ${store.alert.visible ? '' : 'd-none'}`} role="alert">
  <div className={`text-center alert alert-${store.alert.back} ${store.alert.visible ? '' : 'd-none'}`} role="alert">
    {store.alert.text}
  </div>
  </div>
)