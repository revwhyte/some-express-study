class Logger {
    constructor() {
        this.historyLog = []
        this.historyMessages = []
    }
    log(logMsg) {
        this.historyLog.push(JSON.stringify(logMsg))
    }
    logMsg(logMsg) {
        this.historyMessages.push(JSON.stringify(logMsg))
    }
    purge() {
        this.historyLog = []
        this.historyMessages = []
    }
    findByRoute(route) {
        return this.historyLog.find(msg => msg.route.toLowerCase() === route.toLowerCase())
    }
    findByVerb(verb) {
        return this.historyLog.find(msg => msg.verb.toLowerCase() === verb.toLowerCase())
    }
    findByResult(result) {
        return this.historyLog.find(msg => msg.result.toLowerCase() === result.toLowerCase())
    }
    getHistoryLog() {
        return this.historyLog
    }
    getHistoryMessage() {
        return this.historyMessages
    }
    showHistoryLog() {
        this.historyLog.map(h => console.log(h))
    }
    showHistoryMessage() {
        this.historyMessages.map(h => console.log(h))
    }
}

module.exports = Logger