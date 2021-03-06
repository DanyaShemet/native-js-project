export class Question {
    static create(question) {
        return fetch('https://native-js-projects.firebaseio.com/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionsFromLocaleStorage()
        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">Вы еще ничего не спрашивали</div>`

        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static fetch(token){
        if(!token){
            return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        return fetch(`https://native-js-projects.firebaseio.com/question.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error ){
                    return `<p class="error">${response.error}</p>`
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key,
                })) : []
            })
    }

    static ListToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(q=> `<li>${q.text}</li>`).join('')}</ol>`
            : '<p>Вопросов нет</p>'
    }
}

function toCard(question) {
    return `
    <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</a>
    </div>
`
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocaleStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}

function getQuestionsFromLocaleStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

