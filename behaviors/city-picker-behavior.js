 const cityPickerBehavior = Behavior({
  data: {
    show: false,
    values: []
  },
  methods: {
    showCityPicker(){
      this.setData({
        'show': true
      })
    },
    hideCityPicker(){
      this.setData({
        'show': false
      })
    },
    chooseCityPicker(event){
      return new Promise((resolve)=>{
        this.setData({
          'show': false,
          'values':event
        })
        resolve(event)
      })
    }
  }
})

export default cityPickerBehavior