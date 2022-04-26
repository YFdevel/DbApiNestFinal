const app2 = new Vue({
    delimiters: ['${', '}'],
    el: '#app2',
    data: {
        id: new URLSearchParams(window.location.search.substring(1)).get("id"),
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
    methods: {
        sendData() {
            const data = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                tokenForm:this.$refs.token.value,
            }

            if (this.validateInput()) {
                fetch("http://localhost:3000/users/update?id=" + this.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept':'application/json',
                        'Access-Control-Allow-Origin':'*',
                    },
                    mode:'cors',
                    body: JSON.stringify(data)
                }).then(response => response.json())
                    .then(data =>{
                        console.log(data)
                }).catch(function () {
                    console.log("Ошибка загрузки файлов");
                });
            }

        },
        validateInput() {
            return this.firstName.length > 0 && this.lastName.length > 0 &&
                this.email.length > 0 && this.password.length > 0
        }
    },
})