import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import {
  Mongo
} from 'meteor/mongo'

import './main.html';
import '../shared/collections.js'

//routing
Router.configure({
  layoutTemplate: 'ApplicationLayout'
})

Router.route('/', function() {
  this.render('welcome', {
    to: 'main'
  })
})
Router.route('/images', function() {
  this.render('navbar', {
    to: 'navbar'
  })
  this.render('myImage', {
    to: 'main'
  })
})
Router.route('/image/:_id', function() {
  this.render('navbar', {
    to: 'navbar'
  })
  this.render('singleImage', {
    to: 'main',
    data: function() {
      return Images.findOne({
        _id: this.params._id
      })
    }
  })
})




//infiniscroll
Session.set("imageLimit", 8)
lastScrollTop = 0;
$(window).scroll(function(event) {

  if ($(window).scrollTop() + $(window).height() >
    $(document).height() - 100) {
    var scrollTop = $(this).scrollTop()
    if (scrollTop > lastScrollTop) {
      Session.set("imageLimit", Session.get("imageLimit") + 4)
    }
    lastScrollTop = scrollTop
  }

})

//accountsconfig
Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
})

Template.myImage.helpers({
  images: function() {
    if (Session.get("userFilter")) {
      return Images.find({
        createdBy: Session.get("userFilter")
      }, {
        sort: {
          createdOn: -1,
          rating: -1,
        }
      })
    } else {
      return Images.find({}, {
        sort: {
          createdOn: -1,
          rating: -1,
        },
        limit: Session.get("imageLimit")
      })
    }
  },
  filtering_images: function() {
    if (Session.get("userFilter")) {
      return true
    } else {
      return false
    }
  },
  getFilterUser: function() {
    if (Session.get("userFilter")) {
      var user = Meteor.users.findOne({
        _id: Session.get("userFilter")
      })
      return user.username
    } else {
      return false
    }
  },
  getUser: function(user_id) {
    if (user_id === 'Admin') {
      return user_id
    } else {
      var user = Meteor.users.findOne({
        _id: user_id
      })
      if (user) return user.username
      else return "Anon"
    }
  }
})

Template.myImage.events({
  'click .js-del-image': function(event) {
    var image_id = this._id
    console.log(image_id);
    $('#' + image_id).hide('slow', function() {
      Images.remove({
        "_id": image_id
      })
    })
  },
  'click .js-rate-image': function(event) {
    var rating = $(event.currentTarget).data('userrating')
    var image_id = this.id
    Images.update({
      "_id": image_id
    }, {
      $set: {
        'rating': rating
      }
    })
  },
  // 'click js-show-image-form': function(event) {
  //   $("#imageFormModal").modal('toggle')
  //
  // },
  'click .js-set-image-filter': function(event) {
    Session.set("userFilter", this.createdBy)
  },
  'click .js-unset-image-filter': function(event) {
    Session.set("userFilter", undefined)
  }
});

Template.imageFormModal.events({
  'submit .js-add-image': function(event) {
    var img_src = event.target.img_src.value;
    var img_alt = event.target.img_alt.value;
    console.log(img_src + "\n" + img_alt)
    if (Meteor.user()) {
      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdOn: new Date(),
        createdBy: Meteor.user()._id,
        rating: 0
      })
    }
    return false
  }
})

Template.body.helpers({
  username: function() {
    if (Meteor.user())
      return Meteor.user().username
    else
      return "Anonymous User"

  }
})
