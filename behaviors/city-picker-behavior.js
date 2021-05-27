 const cityPickerBehavior = Behavior({
  data: {
    cityPickerWithBehaviorData: {
      show: false,
      values: []
    }
  },
  methods: {
    showCityPicker(){
      this.setData({
        'cityPickerWithBehaviorData.show': true
      })
    },
    hideCityPicker(){
      this.setData({
        'cityPickerWithBehaviorData.show': false
      })
    },
    chooseCityPicker(event){
     
      this.setData({
        'cityPickerWithBehaviorData.show': false,
        'cityPickerWithBehaviorData.values':event
      })
    }
  }
})

export default cityPickerBehavior