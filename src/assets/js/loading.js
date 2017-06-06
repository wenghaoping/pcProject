/**
 * Created by WengHaoping on 2017/6/6.
 */
import Element from 'element-ui'
function loading () {
  this.$loading({ fullscreen: true,text:"正在加载数据中"})
}
function closeLoading(){
  this.$loading({ fullscreen: true,text:"正在加载数据中"}).close();
}

export default {
  loading,
  closeLoading
}
