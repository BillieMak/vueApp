<template>
    <img v-if="img" :src="img" alt="Bg">
    <div class="bg-dark">

    </div>

    <div class="indecision-container">
        <input type="text" placeholder="Hasme una Pregunta" v-model="question">
        <p>Recuerda terminar con un signo de interrogacion (?)</p>
        <div v-if="isValidQuestion">
            <h2>{{ answerClass }}</h2>
            <h2>{{ answer }}</h2>
            <!-- <h1>Si, No Pensando</h1> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "Indecision",
    data() {
        return {
            question: "",
            answer: null,
            img: null,
            isValidQuestion: false
        }
    },
    methods: {
        async getAnswer() {
            try {
                this.answer = "Pensando..."
                const { answer, image } = await fetch("https://yesno.wtf/api")
                    .then(res => res.json())
                this.answer = answer
                this.img = image
            } catch (error) {
                this.answer = "No se pudo cargar la respuesta 🥺"
                this.img = null
            }
        }
    },
    computed: {
        answerClass() {
            return this.answer === "yes" ? "si" : "no"
        }
    },
    watch: {
        question(newQuestion, oldQuestion) {

            this.isValidQuestion = false

            console.log({ newQuestion })

            if (!newQuestion.includes("?")) return
            //TODO: hacer peticion http://yesno.wtf/api
            this.isValidQuestion = true
            this.getAnswer()
        }
    }
}
</script>
<style scoped>
img,
.bg-dark {
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
}

.bg-dark {
    background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
    position: relative;
    z-index: 99;
}

input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
}

input:focus {
    outline: none;
}

p {
    color: white;
    font-size: 20px;
    margin-top: 10px;
}

h1,
h2 {
    color: white;
}

h2 {
    margin-top: 150px;
}
</style>