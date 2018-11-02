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
//EVENT COMPONENT
const Events = Vue.component('event', {
  template: '<li>{{ event.name }} <a :href="calendarURL" target="_blank">Add to Calendar</a></li>',
  props: ['event'],
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.name}`
    }
  }
})
// MAIN APP COMPONENT
const app = new Vue({
  el: '#app',
  components: {
    result: Result,
    event: Events
  },
  data() {
    return {
      //updates from v-model text input search
      location: "",
      usernameL: "",
      passwordL: "",
      username: "",
      email: "",
      password: "",
      passConf: "",
      //array of businesses returned from location query to yelp api
      results: [],
      events: []
    }
  },




  methods: {
    login(user, pass) {
      console.log(user, pass);
      fetch('/login', {
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({user, pass})
            })
     
    },
    signup(user, email, pass, passC) {
      console.log(user, email, pass, passC);
      fetch('/signup', {
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({user, email, pass, passC})
            })
     
    },
    search(location) {
      console.log(location);
      fetch(`/loc/${location}`)
    .then(response => {  
      console.log(response, "RESPONSE IN CLIENT");  
        return response.json()
      }).then(data => {
        const stuff = JSON.parse(data);
        this.results = stuff.businesses
        console.log(this.results, "RESULTS FROM YELP IN CLIENT");
      })
      fetch(`/event/${location}`)
      .then(res => {
        return res;
      }).then((result) => {
        console.log(result, "RESULT FROM EVENTS IN CLIENT");
        this.events = result;
      })
    }
  }
})
