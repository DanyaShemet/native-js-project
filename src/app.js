import './style.css'
import {createModal, isValid} from "./utils";
import {Question} from './question'
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const form = document.getElementById('form');
const modalBtn = document.getElementById('modalBtn');
const input  = form.querySelector('#question');
const submitBtn  = form.querySelector('#submit');

window.addEventListener('load', Question.renderList)
modalBtn.addEventListener('click', openModal)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
});

function submitFormHandler(e) {
    e.preventDefault();
    if(isValid(input.value)){
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        };
        submitBtn.disabled = true
        // Async request to server to save question
        Question.create(question).then(()=>{
            console.log('question',question)
            input.value = ' '
            input.className= ''
            submitBtn.disabled = false
        });
    }
}

function openModal() {
    createModal('Авторизация', getAuthForm())
    document.getElementById('auth-form')
    .addEventListener('submit', AuthFormHandler, {once: true});
}

function AuthFormHandler(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const email  = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#pass').value;
    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(()=> {btn.disabled = false})
}

function renderModalAfterAuth(content) {
    if(typeof content === 'string'){
        createModal('Ошибка!',content)
    }else{
        createModal('Список вопросов',Question.ListToHTML(content))
    }
}

