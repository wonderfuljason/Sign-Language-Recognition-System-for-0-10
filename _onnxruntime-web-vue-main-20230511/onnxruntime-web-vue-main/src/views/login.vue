<template>
    <div class="login-register">
        <div class="logo-container">
            <img class="logo" src="../assets/logo.jpg" alt="Logo">
        </div>
        <h2>用户登陆</h2>
        <form @submit.prevent="login" class="login-form">
            <label for="username">用户名:</label>
            <input type="text" id="username" v-model="loginForm.username" required>
            <br>
            <label for="password">密码:</label>
            <input type="password" id="password" v-model="loginForm.password" required>
            <br>
            <button type="submit">登陆</button>
            <button @click="showRegisterForm" class="register-button">用户注册</button>
        </form>


        <div v-if="showRegister" class="register-overlay">
            <div class="register-modal">
                <h2>用户注册</h2>
                <form @submit.prevent="register" class="register-form">
                    <label for="regUsername">用户名:</label>
                    <input type="text" id="regUsername" v-model="registerForm.username" required>
                    <br>
                    <label for="regPassword">密码:</label>
                    <input type="password" id="regPassword" v-model="registerForm.password" required>
                    <br>
                    <button type="submit">注册</button>
                    <button type="button" @click="cancelRegister">关闭</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            registerForm: {
                username: '',
                password: ''
            },
            showRegister: false
        };
    },
    methods: {
        login() {
            axios.post('http://127.0.0.1:3007/api/login', this.loginForm)
                .then(response => {
                    // 处理登录成功的逻辑
                    if(response.data.status===1){
                        alert(response.data.message)
                    }
                    if(response.data.status===0){
                        
                        localStorage.setItem('token',response.data.token)
                        this.$router.push('/index');
                    }
                    console.log('Login success:', response.data);
                })
                .catch(error => {
                    // 处理登录失败的逻辑
                    console.error('接口调用失败', error);
                });
        },
        showRegisterForm() {
            this.showRegister = true;
        },
        register() {
            axios.post('http://127.0.0.1:3007/api/reguser', this.registerForm)
                .then(response => {
                    // 处理注册成功的逻辑
                    if(response.data.status===1){
                        alert(response.data.message)
                    }
                    if(response.data.status===0){
                        this.loginForm.username=this.registerForm.username
                        alert('注册成功')
                    }
                    console.log('Register success:', response.data);
                    this.cancelRegister();
                })
                .catch(error => {
                    // 处理注册失败的逻辑
                    console.error('接口调用失败', error);
                });
        },
        cancelRegister() {
            this.showRegister = false;
            this.registerForm.username = '';
            this.registerForm.password = '';
        }
    }
};
</script>
  
<style scoped>
.login-register {
    position: relative;
    border: 1px solid orange;
    width: 400px;
    margin: 100px auto 0;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

.logo-container {
    position: relative;
    top: -60px;
    /* 根据实际情况调整偏移量 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

label {
    display: block;
    margin-bottom: 10px;
    color: #333;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button[type="submit"] {
    margin-right: 10px;
}

.register-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-modal {
    max-width: 400px;
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
}

.register-form {
    margin-top: 20px;
}

@media (max-width: 480px) {
    .login-register {
        max-width: 100%;
        padding: 10px;
    }

    h2 {
        font-size: 20px;
        margin-bottom: 15px;
    }

    input[type="text"],
    input[type="password"] {
        padding: 8px;
        margin-bottom: 10px;
    }

    button {
        padding: 8px 16px;
    }
}
</style>