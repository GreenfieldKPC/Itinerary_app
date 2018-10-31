
// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

//RESULT COMPONENT
const Result = Vue.component('result', {
  template: '<li>{{ business.name }} <a :href="calendarURL" target="_blank">Add to Calendar</a></li>',
  props: ['business'],
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.business.name}&location=${this.business.location.address1}%2C+${this.business.location.city}%2C+${this.business.location.state}`
    }
  }
})

// MAIN APP COMPONENT
const app = new Vue({
  el: '#app',
  components: {
    result: Result
  },
  data() {
    return {
      //updates from v-model text input search
      location: "",
      //array of businesses returned from location query to yelp api
      results: []
    }
  },
  methods: {
    search() {
      console.log(location);
      fetch(`/loc/houston`)
    .then(response => {  
      console.log(response, "RESPONSE IN CLIENT");  
        return response.json()
      }).then(data => {
        const stuff = JSON.parse(data);
        this.results = stuff.businesses
        console.log(this.results);
      })
    }
  }
})
