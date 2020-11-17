class LogMessage {
    constructor() {
        this.route = ''
        this.verb = ''
        this.result = ''
        this.msg = ''
    }
    getRoute() {
        return this.route
    }
    setRoute(route) {
        this.route = route
    }

    getVerb() {

        return this.verb
    }
    setVerb(verb) {
        this.verb = verb
    }

    getResult() {
        return this.result
    }
    setResult(result) {
        this.result = result
    }

    generateMessage() {
        this.msg = `${this.verb} '${this.route}': ${this.result}`
    }

    retrieve() {
        return this.msg
    }
}

module.exports = LogMessage