import $ from 'jquery'

$(document).ready(() => {
    $('#main').click(() => {
        let text = $('#text').val()
        process(text)
    })
})

function process(text) {
    let linhas = text.split(/\n/g).filter(l => l !== '')
    console.log(linhas)
    
    
    let palavras = text.replace(/\n/g, ' ').split(' ').sort().reduce((fruitsCount, currentFruit) => {
        if (typeof fruitsCount[currentFruit] !== "undefined") {
            fruitsCount[currentFruit]++
            return fruitsCount
        } else {
            fruitsCount[currentFruit] = 1
            return fruitsCount
        }
    }, {})
    
    let lOcorr = {}
    for(let palavra in palavras) {
        for(let linha in linhas) {
            let palInLinha = linhas[linha].split(' ')
            let contem = palInLinha.indexOf(palavra) > -1
            if(contem) {
                if(lOcorr[palavra]){
                    lOcorr[palavra].push(Number(linha) + 1)
                } else {
                    lOcorr[palavra] = []
                    lOcorr[palavra].push(Number(linha) + 1)
                }
            }
        }
    }
    
    for(let x in palavras) {
        $('#result').append(`<tr><td>${x}</td><td>${palavras[x]}</td><td>${lOcorr[x]}</td></tr>`)
    }
    
}