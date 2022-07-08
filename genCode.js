function genProductId(num = 10, append = 5) {
    let result = []

    let val = () => {
        let rnd = Math.floor(Math.random() * 122)
        if (rnd >= 97 && rnd <= 102) {
            result.push(String.fromCharCode(rnd))
        } else if (rnd > 48 && rnd < 57) {
            result.push(String.fromCharCode(rnd))
        } else {
            val()
        }
    }
    for (i = 0; i < num; i++) {
        val()
    }
    result.push('-')
    for (i = 0; i < append; i++) {
        val()
    }
    return result.join('')
}

module.exports = {
    genProductId,
}
