function afficheA() {
    return new Promise((resolve, reject) => {
        resolve(console.log("A"))
    })
}
function afficheB() {
    return new Promise((resolve, reject) => {
        resolve(console.log("B"))
    })
}
function afficheC() {
    return new Promise((resolve, reject) => {
        resolve(console.log("C"))
    })
}
function afficheD() {
    return new Promise((resolve, reject) => {
        resolve(console.log("D"))
    })
}   
function afficheE() {
    return new Promise((resolve, reject) => {
        resolve(console.log("E"))
    })
}
function afficheF() {
    return new Promise((resolve, reject) => {
        resolve(console.log("F"))
    })
}
function afficheG() {
    return new Promise((resolve, reject) => {
        resolve(console.log("G"))
    })
}
afficheA()
    .then(afficheD())
    .then(afficheC())
    .then(afficheE())
    .then(afficheB())
    .then(afficheF())
    .then(afficheG())