import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './main.html';


if (Meteor.isClient) {
  var img_data = [{
    img_src: "/victor.jpg",
    img_alt: "Victor with his puppy doll"
  }, {
    img_src: "/victor2.jpg",
    img_alt: "victor waiting for ya"
  }, {
    img_src: "/yuri.jpg",
    img_alt: "yuri is sad"
  }, {
    img_src: "ready.png",
    img_alt: "the couple is ready for the finale!"
  }]
  Template.myImage.helpers({
    images: img_data
  });
  Template.myImage.events({
    'click .js-image':function(event){
      $(event.target).css("width", "30%")
    }
  });
}

if (Meteor.isServer) {
  console.log("I am the server");
}
/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);


});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
