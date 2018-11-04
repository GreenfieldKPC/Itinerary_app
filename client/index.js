const Result = Vue.component('result', {

  template: `<li>
  <img v-bind:src='business.image_url'/><br>
      {{ business.name }}<br>{{ business.location.address1 +'. '+ business.location.city +', '+ business.location.state }}<br>
      <a href="business.url">Website</a><br>
      <a :href="calendarURL" target="_blank">Add to Calendar</a>
      </li>`,

  props: ['business'],
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.business.name}&location=${this.business.location.address1}%2C+${this.business.location.city}%2C+${this.business.location.state}`;
    },
  },
});

const Events = Vue.component('event', {
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
                  <a href="event.url">Website</a><br>
                  <a :href="calendarURL" target="_blank">Add to Calendar</a>
                </div>
              </div>
            </div>`,
  props: ['event'],
  computed: {
    calendarURL() {
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.event.name.text}`;
    },
  },
  methods: {
    add() {
      console.log('hello');
    },
  },
});

const Interests = Vue.component('interest', {
  template: `<div class="top-buffer">
  <button type="button" class="btn btn-block btn-warning">{{ interest }}</button>
  </div>`,
  props: ['interest'],
  methods: {
    addToSearch() {

    },
    updateUserInterests() {

    },
  },
});

// MAIN APP COMPONENT
const app = new Vue({
  el: '#app',
  components: {
    result: Result,
    event: Events,
    interest: Interests,
  },

  data() {
    return {

      // updates from v-model text input search
      location: '',
      usernameL: '',
      passwordL: '',
      username: '',
      email: '',
      password: '',
      passConf: '',
      // array of businesses returned from location query to yelp api
      interests: ['business', 'education', 'performing and arts', 'sports', 'film and media', 'community and culture', 'charity and causes', 'travel and outdoor', 'science and technology', 'health and wellness', 'fashion', 'seasonal', 'regional', 'government', 'home and lifestyle', 'other'],
      results: [],

      events: [{
        name: {
          text: 'HUDSON TERRACE  SATURDAY NIGHT PARTY ',
          html: 'HUDSON TERRACE  SATURDAY NIGHT PARTY ',
        },
        description: {
          text: "For BOTTLE SERVICE please email us at BOOKING (Add details)  \r\nROOFTOP PARTY SATURDAY NIGHT   \r\nat\r\nHUDSON TERRACE ROOFTOP     \r\n621 West 46th Street \r\n \r\nNEW YORK CITY NIGHTCLUB \r\n \r\n \r\nMusic by :\r\nDJ DUBBS & GUEST \r\nDoors Open at 10PM \r\n \r\nTABLE RESERVATION FOR BOTTLE SERVICE, B'DAY PARTY OR ANY EVENT Please  send us an email to BOOKING\r\nGirls free till 12am $20 after  & Gents $20 -30 ( please arrive early to avoid long lines ) \r\n \r\n 21 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretn\r\n Must show tickets or SAY ICLUBNYC LIST  AT THE DOOR TO GET RIGHT IN \r\n \r\nSTRICT DRESS CODE POLICY: -Gentlemen: Shoes, Button down shirts, and jeans are acceptable. No\r\nbaggy attire, Sneakers, Boots, or Hats are allowed. -Ladies: Heels & classy look Please\r\n \r\nCONTACT US\r\n \r\n www.iclubnyc.com\r\n\r\n\r\n\r\n\r\n\r\n \r\n\r\n",
          html: "<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"font-kerning: none;\"><B>For BOTTLE SERVICE please email us at </B><A HREF=\"http://www.iclubnyc.com/table-reservation-.html\" REL=\"nofollow\"><SPAN STYLE=\"line-height: normal; font-family: 'Helvetica Neue'; -webkit-font-kerning: none; color: #042eee;\"><B>BOOKING</B></SPAN></A><B> (Add details) </B></SPAN> </P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #3366ff;\"><SPAN STYLE=\"font-kerning: none;\"><B>ROOFTOP PARTY SATURDAY NIGHT   </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #3366ff;\"><SPAN STYLE=\"font-kerning: none;\"><B>at</B></SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 24px; line-height: normal; font-family: Verdana; color: #993300;\"><SPAN STYLE=\"font-kerning: none;\"><B>HUDSON TERRACE ROOFTOP    </B></SPAN><SPAN STYLE=\"font-size: 13px; color: #000000;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #993300;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\">621 West 46th Street </SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #993300;\"> </P>\r\n<P STYLE=\"font-family: 'Helvetica Neue'; line-height: normal; margin: 0px; color: #993300;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\">NEW YORK CITY NIGHTCLUB </SPAN></P>\r\n<P STYLE=\"font-family: 'Helvetica Neue'; line-height: normal; margin: 0px; color: #993300;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #993300;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"font-kerning: none;\">Music by :</SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-kerning: none;\">DJ DUBBS &amp; GUEST</SPAN><SPAN STYLE=\"font-kerning: none;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #ff2500;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\"><B>Doors Open at 10PM </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"color: #000000;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue'; color: #ff2500;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\"><B STYLE=\"color: #0433ff; font-family: Arial; font-size: 10px;\">TABLE RESERVATION FOR BOTTLE SERVICE, B'DAY PARTY OR ANY EVENT Please  send us an email to </B><SPAN STYLE=\"font-size: 13px; line-height: normal; font-family: 'Helvetica Neue'; -webkit-font-kerning: none; color: #000000;\"><B><A HREF=\"http://www.iclubnyc.com/table-reservation-.html\" REL=\"nofollow\"><SPAN STYLE=\"color: #000000;\">BOOKING</SPAN></A></B></SPAN></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-kerning: none;\"><B>Girls free till 12am $20 after  &amp; Gents $20 -30 ( please arrive early to avoid long lines ) </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-kerning: none;\"><B> 21 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretn</B></SPAN></P>\r\n<P STYLE=\"margin: 0px; font-size: 18px; line-height: normal; font-family: 'Helvetica Neue';\"><SPAN STYLE=\"font-size: 13px; line-height: normal; -webkit-font-kerning: none;\"><B> </B></SPAN><SPAN STYLE=\"font-kerning: none;\"><B>Must show tickets or SAY </B></SPAN><SPAN STYLE=\"font-kerning: none; color: #ff2500;\"><B>ICLUBNYC LIST </B></SPAN><SPAN STYLE=\"font-kerning: none;\"><B> AT THE DOOR TO GET RIGHT IN </B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Arial; color: #ff2500;\"><SPAN STYLE=\"font-kerning: none;\"><B>STRICT DRESS CODE POLICY: <SPAN STYLE=\"color: #000000;\">-Gentlemen: Shoes, Button down shirts, and jeans are acceptable. No</SPAN></B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Arial;\"><SPAN STYLE=\"-webkit-font-kerning: none; color: #000000;\"><B>baggy attire, Sneakers, Boots, or Hats are allowed. -Ladies: Heels &amp; classy look Please</B></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"> </P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #042eee;\"><SPAN STYLE=\"text-decoration: underline; -webkit-font-kerning: none; color: #000000;\"><A HREF=\"mailto:rsvp@iclubnyc.com\" REL=\"nofollow\"><SPAN STYLE=\"color: #000000; text-decoration: underline;\"><B>CONTACT US</B></SPAN></A></SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: Verdana;\"><SPAN STYLE=\"color: #000000;\"> </SPAN></P>\r\n<P STYLE=\"margin: 0px; line-height: normal; font-family: 'Helvetica Neue'; color: #551a8b;\"><SPAN STYLE=\"font-kerning: none; color: #000000;\"> <SPAN STYLE=\"-webkit-font-kerning: none;\"><SPAN STYLE=\"color: #000000;\"><A HREF=\"http://www.iclubnyc.com/\" REL=\"nofollow\">www.iclubnyc.com</A></SPAN></SPAN></SPAN></P>\r\n<P><A HREF=\"https://www.eventbrite.com/e/heaven-hell-halloween-party-hudson-terrace-3-rooms-2-floors-free-open-bar-included-tickets-50752843120\"><IMG STYLE=\"display: block; margin-left: auto; margin-right: auto; max-width: 100%;\" ALT=\"Image and video hosting by TinyPic\" SRC=\"https://s.evbuc.com/https_proxy?url=http%3A%2F%2Fi63.tinypic.com%2Fix9fs4.jpg&sig=ADR2i7_O0VksKJo20STF_4FbgMRptoPOtA\"></IMG></A></P>\r\n<P><SPAN STYLE=\"-webkit-font-kerning: none; font-size: large;\"><SPAN STYLE=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\"><A STYLE=\"font-family: Verdana; font-size: 13px;\" HREF=\"https://www.eventbrite.com/e/heaven-hell-halloween-party-hudson-terrace-3-rooms-2-floors-free-open-bar-included-tickets-50752843120\"><IMG STYLE=\"display: block; margin-left: auto; margin-right: auto; max-width: 100%;\" ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/50698884/hudsonpic.png\"></IMG></A></SPAN></SPAN></P>\r\n<P><IMG STYLE=\"display: block; margin-left: auto; margin-right: auto; max-width: 100%;\" ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/50698884/salonwide.jpg\"></P>\r\n<P><BR></P>\r\n<P><A STYLE=\"font-family: Verdana; font-size: 13px;\" HREF=\"https://www.eventbrite.com/e/heaven-hell-halloween-party-hudson-terrace-3-rooms-2-floors-free-open-bar-included-tickets-50752843120\"><SPAN STYLE=\"-webkit-font-kerning: none; font-size: large;\"><SPAN STYLE=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\"><BR></SPAN></SPAN></A></P>\r\n<P> </P>\r\n<P><BR></P>\r\n<P><IMG ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/24082266/worldflagsmovingmdwm.gif\"></P>",
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
    visitor() {
      return true;
    },
    loggedInUser() {
      return true;
    },
    login(user, pass) {
      console.log(user, pass);
      fetch('/login', {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify({ user, pass }),
      });
    },
    signup(username, email, password, passwordConf) {
      console.log(username, email, password, passwordConf);
      fetch('/signup', {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify({
        username, email, password, passwordConf 
      }),
      }).then((response) => {
        console.log(response);
      });
    },
    search(location) {
      fetch(`/loc/${location}`)

        .then((response) => {
          console.log(response, 'RESPONSE IN CLIENT');
          return response.json();
        }).then((data) => {
          const stuff = JSON.parse(data);
          this.results = stuff.businesses;
          console.log(this.results, 'RESULTS FROM YELP IN CLIENT');
        });

      fetch(`/event/${location}`)
        .then((res) => res.json()).then((result) => {
          result = JSON.parse(result);

          this.events = result.events;
        });
    },
    add() {
      console.log('click');
      return 'https://www.google.com/calendar/render?action=TEMPLATE';
    },
    clickOninterest(clicked) {
      clicked = !clicked;
    },
    selected (e) {
      // //$(e.currentTarget).css('background', '#41c69e')
      // 'selected' = true;
      console.log(e);
    },

  },
});
