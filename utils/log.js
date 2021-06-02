import { formatTime } from './util'
export default class Log {
    constructor(context) {
        this.debug = context.globalData.debug
    }
    m(text = '', title = "messages") {
        if (!this.debug) return
        console.log(`%c${title}%c` + formatTime(new Date()),
            'background: #00cc00; color: #fff; border-radius: 3px 0 0 3px;padding:2px 5px',
            'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;padding:2px 5px',
            text
        )
    }
    e(text = '', title = "errors") {
        if (!this.debug) return
        console.log(`%c${title}%c` + formatTime(new Date()),
            'background: #ee0a24; color: #fff; border-radius: 3px 0 0 3px;padding:2px 11px',
            'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;padding:2px 5px',
            text
        )
    }
    i(text = '', title = "info") {
        if (!this.debug) return
        console.log(`%c${title}%c` + formatTime(new Date()),
            'background: #1989fa; color: #fff; border-radius: 3px 0 0 3px;padding:2px 17.5px',
            'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;padding:2px 5px',
            text
        )
    }
    w(text = '', title = "warning") {
        if (!this.debug) return
        console.log(`%c${title}%c` + formatTime(new Date()),
            'background: #ff976a; color: #fff; border-radius: 3px 0 0 3px;padding:2px 8px',
            'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;padding:2px 5px',
            text
        )
    }
}