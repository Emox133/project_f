const restricted = ['<', '>', 'img', 'script']

const restrictXss = (fields) => {
    restricted.forEach(el => {
        if(el === fields) {
            console.log(true)
        }
    })
}

module.exports = restrictXss