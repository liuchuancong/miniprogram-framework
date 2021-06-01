import cityPickerBehavior from '../../behaviors/city-picker-behavior'
import areaList from '../../common/area-list'
Component({
  behaviors: [cityPickerBehavior],
  properties:{
    cityPickerColumnsNum: {
      type: Number,
      default: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    areaList
  },
  methods: {
    onClose(){
      this.hideCityPicker()
    },
    onConfirm(event){
      this.chooseCityPicker(event.detail.values)
    }
  }
})
