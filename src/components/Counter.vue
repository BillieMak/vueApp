<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<script>
export default {
  name: "Counter",
  props: {
    title: {
      type: String,
      // required: true,
    },
    start: {
      type: Number,
      default: 4,
      validator(value) {
        return value > 100;
      },
    },
  },
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    increment() {
      this.counter = this.counter + 1;
    },
    decrement() {
      this.counter--;
    }
  },
  computed: {
    squareCounter() {
      return this.counter * this.counter;
    },
    customTitle() {
      return this.title || "Counter Custom"
    }
  }
};
</script>

<style>
button {
  background-color: #4CAF50;
  border-radius: 8px;
  border: none;
  color: white;
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
  padding: 10px;
  text-align: center;
  text-decoration: none;

}

button:hover {
  background-color: #3e8e41;
  cursor: pointer;
}
</style>