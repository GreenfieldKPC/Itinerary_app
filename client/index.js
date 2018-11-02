

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

      //updates from v-model text input search
      location: "",
      usernameL: "",
      passwordL: "",
      username: "",
      email: "",
      password: "",
      passConf: "",
      //array of businesses returned from location query to yelp api
      interests: ["Business", "education", "performing and arts", "sports", "film and media", "community and culture", "charity and causes", "travel and outdoor", "science and technology", "health and wellness", "fashion", "seasonal", "regional", "government", "home and lifestyle", "other"],
      results: [],
      events: [],
      toggle: true,
      usersInterest: [],
    };
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
    clickOninterest(clicked) {
      clicked = !clicked;

    },
    selected: function (e) {
      // //$(e.currentTarget).css('background', '#41c69e')
      // 'selected' = true;
      console.log(e);
    }

  }
})
