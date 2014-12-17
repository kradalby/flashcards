function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var Cards = (function() {
    
    var render_page = function (data) {
        var subjectElement = document.querySelector("#subject").children[0]
        subjectElement.innerHTML = data.subject
    
        var first = Object.keys(data.cards)[Math.floor(Math.random() * Object.keys(data.cards).length) + 1]
    
        render_card(first, data.cards[first])
    
    }
    
    var render_card = function (title, desc) {
        var titleElement = document.querySelector("#title").children[0]
        var descElement = document.querySelector("#description").children[0]
    
        titleElement.innerHTML = title
        descElement.innerHTML = desc
        descElement.hidden = true
    }
    
    var next_card = function () {
        var title = document.querySelector("#title").children[0].innerHTML
        var keys = shuffleArray(Object.keys(data.cards))
        var current = keys.indexOf(title)
        var nextIndex = current+1

        if (nextIndex == keys.length) {
            nextIndex = 0
        }

        var next = keys[nextIndex]
        render_card(next, data.cards[next])
    }

    var load_data = function(file) {
        var xmlhttp = new XMLHttpRequest()
    
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                data = JSON.parse(xmlhttp.responseText)
                Cards.renderPage(data)
            }
        }
        xmlhttp.open("GET", file, true)
        xmlhttp.send()
    }

    return {
        renderCard: render_card,
        renderPage: render_page,
        nextCard: next_card,
        loadData: load_data
    }

})()

window.addEventListener('load', function () {
    var data = {
        "subject": "",
        "cards": {
            "": "",
        }
    }
    Cards.loadData('tdt4237.json')
    var derp = function () {
        var descElement = document.querySelector("#description").children[0]
        if (descElement.hidden) {
            descElement.hidden = false
        } else {
            Cards.nextCard()
        }
    }
    window.addEventListener('click', derp) 
    window.addEventListener('keypress', derp) 
    window.addEventListener('touchend', derp) 
})
