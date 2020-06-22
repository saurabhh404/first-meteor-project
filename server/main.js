import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo'
import '../shared/collections.js'


Meteor.startup(() => {
  if (Images.find().count() == 0) {
    for (var i = 1; i < 23; i++) {
      Images.insert({
        img_src: "img_" + i + ".jpg",
        img_alt: "img number" + i,
      })
    }
    Images.insert({
      img_src: "/victor.jpg",
      img_alt: "Victor with his puppy doll",
      createdBy: "AdminID",
      username: "Admin",
      rating: 5
    })
    Images.insert({
      img_src: "/victor2.jpg",
      img_alt: "victor waiting for ya",
      createdBy: "AdminID",
      username: "Admin",
      rating: 5
    })
    Images.insert({
      img_src: "/yuri.jpg",
      img_alt: "yuri is sad",
      createdBy: "AdminID",
      username: "Admin",
      rating: 5
    })
    Images.insert({
      img_src: "ready.png",
      img_alt: "the couple is ready for the finale!",
      createdBy: "AdminID",
      username: "Admin",
      rating: 5
    })
    console.log("main.js - server says: " + Images.find().count());
  }
});
