export function getAuthForm() {
    return `
         <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="email" id="email" required>
                    <label for="email">Email</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="pass" required>
                    <label for="pass">Пароль</label>
                </div>
                <button
                        type="submit"
                        class="mui-btn mui-btn--raised mui-btn--accent"
                >
                    Войти
                </button>
            </form>
    `
}


export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyBa7_K85zJuXUwM5uzowDJSI6ZvQxxUrYw'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)

}