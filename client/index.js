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
  },
});

// LOG IN COMPONENET
const Login = Vue.component('login', {
  // html to render
  template: `
  <div id="login" class="container-fluid"> 
    <div class='row text-center'>
      <div class="col-md-8">
        <input type="text" placeholder="Enter username" v-model="usernameL">
      </div>
      <div class="col-md-8">
        <input type="password" placeholder="Enter password" v-model="passwordL">
      </div>
      <div class="col-md-8">
        <button class="login btn btn-default" value="Login" @click="login.call(this, usernameL, passwordL)"> LOG IN </button>
      </div>
    </div>
</div>
  `,
  props: ['usersInterest'],
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
            return this.$parent.usersInterest;
          });
          // fetch(`/loc/${location}`)
          is_visitor = false;
          if (!is_visitor) {
            // If not authenticated, add a path where to redirect after login.
            this.$router.push({ path: '/home' });
          }
        }
      });
      // fetch('/interest', {
      //   method: 'PATCH',
      //   headers: new Headers(),
      //   body: JSON.stringify({ username: user, interest: this.$parent.userInterests }),
      // }).then(res => res.json()).then(response => response);
    },
  },
});

// SIGN UP COMPONENT
const Signup = Vue.component('signup', {
  // html to render
  template: `
  <div id="signup" class="container-fluid">
  <div class='row text-center'>
      <div class="col-md-8">
        <input type="text" placeholder="Enter username" v-model="username">
      </div>
      <div class="col-md-8">
        <input type="text" placeholder="Enter email address" v-model="email">
      </div>
      <div class="col-md-8">
        <input type="password" placeholder="Enter password" v-model="password">
      </div>
      <div class="col-md-8">
        <input type="password" placeholder="Confirm password" v-model="passConf">
      </div>
      <div class="col-md-8">
        <button class="signup btn btn-default" value="SignUp" @click="signup.call(this, username, email, password, passConf)"> SIGN UP </button>
      </div>
    </div>
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
  <div class="container-fluid interests">
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
      // this.userClick(e);
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
      results: [],

      events: [{
        name: {
          text: 'HUDSON TERRACE  SATURDAY NIGHT PARTY ',
          html: 'HUDSON TERRACE  SATURDAY NIGHT PARTY ',
        },
        description: {
          text: "For BOTTLE SERVICE please email us at BOOKING (Add details)  \r\nROOFTOP PARTY SATURDAY NIGHT   \r\nat\r\nHUDSON TERRACE ROOFTOP     \r\n621 West 46th Street \r\n \r\nNEW YORK CITY NIGHTCLUB \r\n \r\n \r\nMusic by :\r\nDJ DUBBS & GUEST \r\nDoors Open at 10PM \r\n \r\nTABLE RESERVATION FOR BOTTLE SERVICE, B'DAY PARTY OR ANY EVENT Please  send us an email to BOOKING\r\nGirls free till 12am $20 after  & Gents $20 -30 ( please arrive early to avoid long lines ) \r\n \r\n 21 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretn\r\n Must show tickets or SAY ICLUBNYC LIST  AT THE DOOR TO GET RIGHT IN \r\n \r\nSTRICT DRESS CODE POLICY: -Gentlemen: Shoes, Button down shirts, and jeans are acceptable. No\r\nbaggy attire, Sneakers, Boots, or Hats are allowed. -Ladies: Heels & classy look Please\r\n \r\nCONTACT US\r\n \r\n www.iclubnyc.com\r\n\r\n\r\n\r\n\r\n\r\n \r\n\r\n",
          html: "<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"font-kerning: none;\"><B>For BOTTLE SERVICE please email us at </B><A HREF=\"http://www.iclubnyc.com/table-reservation-.html\" REL=\"nofollow\"><SPAN STYLE=\"line-height: normal; font-family: 'Helvetica Neue'; -webkit-font-kerning: none; color: #042eee;\"><B>BOOKING</B></SPAN></A><B> (Add details) </B></SPAN> </P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #3366ff;\"><SPAN STYLE=\"font-kerning: none;\"><B>ROOFTOP PARTY SATURDAY NIGHT   </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #3366ff;\"><SPAN STYLE=\"font-kerning: none;\"><B>at</B></SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 24px; line-height: normal; font-family: Verdana; color: #993300;\"><SPAN STYLE=\"font-kerning: none;\"><B>HUDSON TERRACE ROOFTOP    </B></SPAN><SPAN STYLE=\"font-size: 13px; color: #000000;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #993300;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\">621 West 46th Street </SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #993300;\"> </P>\r\n<P STYLE=\"font-family: 'Helvetica Neue'; line-height: normal; margin: 0px; color: #993300;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\">NEW YORK CITY NIGHTCLUB </SPAN></P>\r\n<P STYLE=\"font-family: 'Helvetica Neue'; line-height: normal; margin: 0px; color: #993300;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #993300;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"font-kerning: none;\">Music by :</SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-kerning: none;\">DJ DUBBS &amp; GUEST</SPAN><SPAN STYLE=\"font-kerning: none;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #ff2500;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\"><B>Doors Open at 10PM </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"color: #000000;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #ff2500;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\"><B STYLE=\"color: #0433ff; font-family: Arial; font-size: 10px;\">TABLE RESERVATION FOR BOTTLE SERVICE, B'DAY PARTY OR ANY EVENT Please  send us an email to </B><SPAN STYLE=\"font-size: 13px; line-height: normal; font-family: 'Helvetica Neue'; -webkit-font-kerning: none; color: #000000;\"><B><A HREF=\"http://www.iclubnyc.com/table-reservation-.html\" REL=\"nofollow\"><SPAN STYLE=\"color: #000000;\">BOOKING</SPAN></A></B></SPAN></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-kerning: none;\"><B>Girls free till 12am $20 after  &amp; Gents $20 -30 ( please arrive early to avoid long lines ) </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-kerning: none;\"><B> 21 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretn</B></SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-size: 13px; line-height: normal; -webkit-font-kerning: none;\"><B> </B></SPAN><SPAN STYLE=\"font-kerning: none;\"><B>Must show tickets or SAY </B></SPAN><SPAN STYLE=\"font-kerning: none; color: #ff2500;\"><B>ICLUBNYC LIST </B></SPAN><SPAN STYLE=\"font-kerning: none;\"><B> AT THE DOOR TO GET RIGHT IN </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Arial; color: #ff2500;\"><SPAN STYLE=\"font-kerning: none;\"><B>STRICT DRESS CODE POLICY: <SPAN STYLE=\"color: #000000;\">-Gentlemen: Shoes, Button down shirts, and jeans are acceptable. No</SPAN></B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Arial;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\"><B>baggy attire, Sneakers, Boots, or Hats are allowed. -Ladies: Heels &amp; classy look Please</B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #042eee;\"><SPAN STYLE=\"text-decoration: underline; -webkit-font-kerning: none; color: #000000;\"><A HREF=\"mailto:rsvp@iclubnyc.com\" REL=\"nofollow\"><SPAN STYLE=\"color: #000000; text-decoration: underline;\"><B>CONTACT US</B></SPAN></A></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"color: #000000;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #551a8b;\"><SPAN STYLE=\"font-kerning: none; color: #000000;\"> <SPAN STYLE=\"-webkit-font-kerning: none;\"><SPAN STYLE=\"color: #000000;\"><A HREF=\"http://www.iclubnyc.com/\" REL=\"nofollow\">www.iclubnyc.com</A></SPAN></SPAN></SPAN></P>\r\n<P><A HREF=\"https://www.eventbrite.com/e/heaven-hell-halloween-party-hudson-terrace-3-rooms-2-floors-free-open-bar-included-tickets-50752843120\"><IMG STYLE=\"display: block; margin-left: auto; margin-right: auto; max-width: 100%;\" ALT=\"Image and video hosting by TinyPic\" SRC=\"https://s.evbuc.com/https_proxy?url=http%3A%2F%2Fi63.tinypic.com%2Fix9fs4.jpg&sig=ADR2i7_O0VksKJo20STF_4FbgMRptoPOtA\"></IMG></A></P>\r\n<P><SPAN STYLE=\"-webkit-font-kerning: none; font-size: large;\"><SPAN STYLE=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\"><A STYLE=\"font-family: Verdana; font-size: 13px;\" HREF=\"https://www.eventbrite.com/e/heaven-hell-halloween-party-hudson-terrace-3-rooms-2-floors-free-open-bar-included-tickets-50752843120\"><IMG STYLE=\"display: block; margin-left: auto; margin-right: auto; max-width: 100%;\" ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/50698884/hudsonpic.png\"></IMG></A></SPAN></SPAN></P>\r\n<P><IMG STYLE=\"display: block; margin-left: auto; margin-right: auto; max-width: 100%;\" ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/50698884/salonwide.jpg\"></P>\r\n<P><BR></P>\r\n<P><A STYLE=\"font-family: Verdana; font-size: 13px;\" HREF=\"https://www.eventbrite.com/e/heaven-hell-halloween-party-hudson-terrace-3-rooms-2-floors-free-open-bar-included-tickets-50752843120\"><SPAN STYLE=\"-webkit-font-kerning: none; font-size: large;\"><SPAN STYLE=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\"><BR></SPAN></SPAN></A></P>\r\n<P> </P>\r\n<P><BR></P>\r\n<P><IMG ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/24082266/worldflagsmovingmdwm.gif\"></P>",
        },
        id: '17434703668',
        url: 'https://www.eventbrite.com/e/hudson-terrace-saturday-night-party-tickets-17434703668?aff=ebapi',
        start: {
          timezone: 'America/New_York',
          local: '2018-11-03T22:00:00',
          utc: '2018-11-04T02:00:00Z',
        },
        end: {
          timezone: 'America/New_York',
          local: '2018-11-04T04:00:00',
          utc: '2018-11-04T09:00:00Z',
        },
        organization_id: '24250841862',
        created: '2015-06-17T22:55:40Z',
        changed: '2018-11-03T20:01:59Z',
        capacity: null,
        capacity_is_custom: null,
        status: 'live',
        currency: 'USD',
        listed: true,
        shareable: true,
        online_event: false,
        tx_time_limit: 480,
        hide_start_date: false,
        hide_end_date: false,
        locale: 'en_US',
        is_locked: false,
        privacy_setting: 'unlocked',
        is_series: false,
        is_series_parent: false,
        is_reserved_seating: false,
        show_pick_a_seat: false,
        show_seatmap_thumbnail: false,
        show_colors_in_seatmap_thumbnail: false,
        source: 'create_2.0',
        is_free: true,
        version: '3.0.0',
        logo_id: '51961149',
        organizer_id: '1717273352',
        venue_id: '27737725',
        category_id: '103',
        subcategory_id: '3018',
        format_id: '11',
        resource_uri: 'https://www.eventbriteapi.com/v3/events/17434703668/',
        is_externally_ticketed: false,
        logo: {
          crop_mask: null,
          original: {
            url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51961149%2F24250841862%2F1%2Foriginal.jpg?auto=compress&s=1a0ebf64497461592247a3cc5dafa859',
            width: 1600,
            height: 1067,
          },
          id: '51961149',
          url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51961149%2F24250841862%2F1%2Foriginal.jpg?h=200&w=450&auto=compress&s=aad7a0707d20bd13adfbfdabeab3ff80',
          aspect_ratio: '1.5',
          edge_color: '#40487d',
          edge_color_set: true,
        },
      }],
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
      // fetch(`/interest/`)
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
