import vueImgView from "./vue-img-view.vue"

const imgView = {
  install (Vue, options) {
    Vue.component(vueImgView.name, vueImgView)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(imgView);
}

export default imgView