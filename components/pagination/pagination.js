// components/pagination/pagination.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        refreshStatus: 1, // 1: 下拉刷新, 2: 松开更新, 3: 加载中, 4: 加载完成
        list: new Array(20).fill({
            title: '111111111111'
        }),
        height: 0,
        move: -65, // movable-view 偏移量
    },
    pageLifetimes: {
        show() {
            wx.createSelectorQuery().in(this).select('#pagination').boundingClientRect((rect) => {
                const { windowHeight } = wx.getSystemInfoSync()
                const { top } = rect
                console.log(rect);
                this.setData({
                    height: windowHeight - top
                })
            }).exec()
        }
    },
    methods: {
        loadMore() {
            console.log('loadMore');
            setTimeout(() => {
                this.setData({
                    list: this.data.list.concat(new Array(20).fill({
                        title: '111111111111'
                    }))
                })
            }, 200);
        },
        refresh() {
            console.log('loadMore');
            setTimeout(() => {
                this.setData({
                    list: new Array(20).fill({
                        title: '111111111111'
                    })
                })
            }, 200);
        },
        /**
         * movable-view 滚动监听
         */
        change(e) {
            let refreshStatus = this.data.refreshStatus,
                diff = e.detail.y;
            if (refreshStatus >= 3) return;
            if (diff > -10) {
                this.setData({
                    refreshStatus: 2
                });
            } else {
                this.setData({
                    refreshStatus: 1
                });
            }
        },
        /**
         * movable-view 触摸结束事件
         */
        touchend() {
            let { refreshStatus } = this.data;
            if (refreshStatus >= 3) return;
            if (refreshStatus === 2) {
                wx.vibrateShort();
                this.setData({
                    refreshStatus: 3,
                    move: 0,
                    mode: 'refresh'
                });
                this.triggerEvent('refresh');
            } else if (refreshStatus === 1) {
                this.setData({
                    move: this.data.scrollHeight1
                });
            }
        },
    }
})