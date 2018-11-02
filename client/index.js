
// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

// RESULT COMPONENT
const Result = Vue.component('result', {
  template: '<li>{{ business.name }} <a :href="calendarURL" target="_blank">Add to Calendar</a></li>',
  props: ['business'],
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.business.name}&location=${this.business.location.address1}%2C+${this.business.location.city}%2C+${this.business.location.state}`;
    },
  },
});
const Events = Vue.component('event', {
  template: '<li>{{ event.name.text }} <a :href="calendarURL" target="_blank">Add to Calendar</a></li>',
  props: ['event'],
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.event.name.text}`
    },
  },
  methods : {
    add() {
      console.log('hello');
    }
  }
})
// MAIN APP COMPONENT
const app = new Vue({
  el: '#app',
  components: {
    result: Result,
    event: Events,
  },
  data() {
    return {
      // updates from v-model text input search
      location: '',
      // array of businesses returned from location query to yelp api
      results: [],
      events: [],
      toggle: true,
    };
  },
  methods: {
    search(location) {
      fetch(`/loc/${location}`)
        .then((response) => {
          return response.json();
        }).then((data) => {
          const stuff = JSON.parse(data);
          this.results = stuff.businesses;
        });
      fetch(`/event/${location}`)
      .then(res => {
        return res.json();
      }).then((result) => {
        result = JSON.parse(result);
      
        this.events = result.events;
      })
    },
    add() {
      console.log('click');
      return `https://www.google.com/calendar/render?action=TEMPLATE`;
    },

  }
})
