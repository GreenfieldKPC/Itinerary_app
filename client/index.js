// import Vue from 'vue';
// import VueRouter from 'vue-router';
// Vue.use(VueRouter);

// IS USER LOGGED IN?
let is_visitor = true;
let showResults = false;
let userInterests = [];

const Navi = Vue.component('navi', {
  template: `
  <div id='navi' >
        <div class="sidebar">
          <ul class="sidebar-nav">
            <li>
              <a id="navbar-toggle">Close <i class="fa fa-bars menu-icon fa-2x" aria-hidden="true"></i></a>
            </li>
            <li @click="flip()">
              <a href <router-link to="/home">Home<i class="fa fa-home menu-icon fa-2x" aria-hidden="true"></i></a>
            </li>
            <li @click="flip()">
              <a href <router-link to="/profile">Profile<i class="fa fa-cog menu-icon fa-2x" aria-hidden="true"></i></a>
            </li>
            <li>
              <a href="https://calendar.google.com/calendar/r" target="_blank">Calender<i class="fa fa-calendar menu-icon fa-2x" aria-hidden="true"></i></a>
            </li>
            <li>
              <a href="#">log out<i class="fa fa-sign-out menu-icon fa-2x" aria-hidden="true"></i>
              </a>
            </li>
    
          </ul>
        </div>
      </div>
  `,
  methods: {
    show() {
      return !is_visitor;
    },
    flip() {
      console.log('clicked');
      showResults = !showResults;
    },
    ifFlipped() {
      return !showResults;
    }
  },
});

// LOG IN COMPONENET
const Login = Vue.component('login', {
  // html to render
  template: `
  <div id="login" > 
      <input type="text" placeholder="Enter username" v-model="usernameL">
      <input type="password" placeholder="Enter password" v-model="passwordL">
  <button class="login" value="Login" @click="login.call(this, usernameL, passwordL)"> LOG IN</button>
</a>
</div>
  `,
  // value of input fields for username and password
  data() {
    return {
      usernameL: '',
      passwordL: '',
    };
  },
  // takes a user and a password
  methods: {
    login(user, pass) {
      console.log(user, pass);
      // sends post request to server
      fetch('/login', {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify({ username: user, password: pass }),
      }).then((response) => {
        console.log(response.status, 'RESPONSE IN CLIENT');
        if (response.status === 404) {
          alert('Click sign up to create an account, or try logging in with the correct info next time');
        } else {
          fetch(`/interests?username=${this.usernameL}`).then((resp) => resp.json()).then((text) => {
            userInterests = text.interests;
            console.log(userInterests);
          }).catch((err) => {
            console.log(err, 'error getting interests');
          });
          // fetch(`/loc/${location}`)
          is_visitor = false;
          if (!is_visitor) {
            // If not authenticated, add a path where to redirect after login.
            this.$router.push({ path: '/home' });
          }
        }
      });
    },
  },
});

// SIGN UP COMPONENT
const Signup = Vue.component('signup', {
  // html to render
  template: `
  <div id="signup">
  <input type="text" placeholder="Enter username" v-model="username">
  <input type="text" placeholder="Update" v-model="email"> </br>
  <input type="password" placeholder="Enter password" v-model="password">
  <input type="password" placeholder="Confirm password" v-model="passConf">
<button class="signup" value="SignUp" @click="signup.call(this, username, email, password, passConf)"> SIGN UP</button>
</a>
</div>
  `,
  // input fields for signup
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passConf: '',
    };
  },
  // send post request to signup endpoint
  methods: {
    signup(username, email, password, passwordConf) {
      console.log(username, email, password, passwordConf);
      fetch('/signup', {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify({
          username, email, password, passwordConf,
        }),
      }).then((response) => {
        console.log(response.ok);
        is_visitor = false;
        if (!is_visitor) {
          // take user to interests after signing up
          this.$router.push({ path: '/interestsPage' });
        }
      });
    },
  },
});

// YELP RESULTS COMPONENT
const Result = Vue.component('result', {
  // html to render
  template: `<li>
  <img v-bind:src='business.image_url'/><br>
      {{ business.name }}<br>{{ business.location.address1 +'. '+ business.location.city +', '+ business.location.state }}<br>
      <a :href="business.url" target="_blank">Website</a><br> 
      <a :href="calendarURL" target="_blank">Add to Calendar</a>
      </li>`,
  // list of places
  props: ['business'],
  // add to calendar
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.business.name}&location=${this.business.location.address1}%2C+${this.business.location.city}%2C+${this.business.location.state}`;
    },
  },
});

// EVENTS COMPONENT
const Events = Vue.component('event', {
  // html to render
  template: `<div class="card">
              <div class="card-header">
                <a class="card-link" data-toggle="collapse" data-parent="#card-317479" href="#card-element-356590">
                <h4>{{ event.name.text }}</h4>
                  {{' start time:' + event.start.local + ' end time:' + event.end.local}}
                </a>
              </div>
              <div id="card-element-356590" class="collapse">
                <div class="card-body">
                <img v-bind:src='event.logo.url'/><br>
                  {{ event.description.text }}<br>
                  <a :href="event.url" target="_blank"> Website</a><br>
                  <a :href="calendarURL" target="_blank">Add to Calendar</a>
                </div>
              </div>
            </div>`,
  // list of events
  props: ['event'],
  // add to calendar function
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.event.name.text}`;
    },
  },
  // necessary function?
  methods: {
    add() {
      console.log('hello');
    },
  },
});

// INTERESTS COMPONENT
const Interests = Vue.component('interest', {
  // html to render
  template: ` 
  <div v-if="show()">
  <div id="profileInfo">
  </br>
  <h2> Update Profile Information </h2>
  <input type="text" placeholder="enter new email address"> <button>UPDATE EMAIL </button> </input> </br> </br>
  <input type="password" placeholder="enter new password"> <input type="password" placeholder="confirm password"> <button>UPDATE PASSWORD </button> </input>
  </div>
  </br>
  <h2> Interests </h2>
  <div class="container-fluid interests" id="accordion">
  <div class="row text-center">
    <div class="col-md-3"
    v-for="interest in interests" :interest="interest" 
    @click="updateUserInterests(interest)">   <button type="button" class="btn btn-block btn-warning">{{ interest }} </button>  </div>
  </div>
</div>
</br>
</br>
</div>
  `,
  props: ['interest', 'userClick'],
  data() {
    return {
      interests: ['business', 'education', 'performing and arts', 'sports', 'film and media', 'community and culture', 'charity and causes', 'travel and outdoor', 'science and technology', 'health and wellness', 'fashion', 'seasonal', 'regional', 'government', 'home and lifestyle', 'other'],
    };
  },
  methods: {
    show() {
      return showResults;
    },
    isVisitor() {
      return is_visitor;
    },
    isLoggedin() {
      return !is_visitor;
    },
    addToSearch() {
      // change color to green
      // add interest to api call to eventbrite

    },
    updateUserInterests(e) {
      console.log(e);
      console.log(this);
      // change button color to green
      // add interest to user profile if user is logged in
      this.$parent.clickOninterest(e);
      this.userClick(e);
    },
  },
});

const Home = Vue.component('home', {

});

// ROUTES
const routes = [
  {
    path: '/login',
    component: Login,
  }, {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/profile',
    component: Interests,
  },
  {
    path: '/home',
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});


// MAIN APP COMPONENT
const app = new Vue({
  router,
  el: '#app',
  components: {
    result: Result,
    event: Events,
    interest: Interests,
    login: Login,
    signup: Signup,
    home: Home,
  },

  data() {
    return {
      // updates from v-model text input search
      geolocation: '',
      location: 'new orleans',
      interests: ['business', 'education', 'performing and arts', 'sports', 'film and media', 'community and culture', 'charity and causes', 'travel and outdoor', 'science and technology', 'health and wellness', 'fashion', 'seasonal', 'regional', 'government', 'home and lifestyle', 'other'],
      results: [ { businesses: "CLICK SEARCH TO GET STARTED" } ],

      events: [],
      //       using a sample event, uncomment empty event array for api calls
      //       events: [],
      toggle: true,
      usersInterest: [],
    };
  },


  methods: {
    isVisitor() {
      return is_visitor;
    },
    loggedInUser() {
      return !is_visitor;
    },
    geoLocate() {
      console.log('clicked');
      if (navigator.geolocation) {
        const self = this;
        navigator.geolocation.getCurrentPosition((position) => {
          self.position = position.coords;
          console.log(self.position.latitude, self.position.longitude);
          // REQUESTS TO YELP AND EVENTBRITE
        });
      }
    },
    displayResults() {
      return showResults;
    },
    toggleInterests() {
      showResults = !showResults;
    },
    search(location) {
      fetch(`/loc/${location}`)

        .then((response) => {
          console.log(response, 'RESPONSE IN CLIENT');
          return response.json();
        }).then((data) => {
          console.log(data, ' DATA IN CLIENT');
          const stuff = JSON.parse(data);
          this.results = stuff.businesses;
          console.log(this.results, 'RESULTS FROM YELP IN CLIENT');
        });

      fetch(`/event/${location}`)
        .then(res => res.json()).then((result) => {
          result = JSON.parse(result);
          // limit number of results
          this.events = result.events.slice(0, 5);
        });
    },
    add() {
      console.log('click');
      return 'https://www.google.com/calendar/render?action=TEMPLATE';
    },
    clickOninterest(clicked) {
      console.log(this.usersInterest);
      if (this.usersInterest.length === 0) {
        this.usersInterest.push(clicked);
      }
      if (!this.usersInterest.includes(clicked)) {
        this.usersInterest.push(clicked);
      }
    },
    selected(e) {
      // //$(e.currentTarget).css('background', '#41c69e')
      // 'selected' = true;
      console.log(e);
    },

  },
}).$mount('#app');
