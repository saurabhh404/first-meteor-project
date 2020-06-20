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

Images = new Mongo.Collection("images")

// var img_data = [{
//   img_src: "/victor.jpg",
//   img_alt: "Victor with his puppy doll"
// }, {
//   img_src: "/victor2.jpg",
//   img_alt: "victor waiting for ya"
// }, {
//   img_src: "/yuri.jpg",
//   img_alt: "yuri is sad"
// }, {
//   img_src: "ready.png",
//   img_alt: "the couple is ready for the finale!"
// }]

// Template.myImage.helpers({
//   images: img_data
// });

Template.myImage.helpers({
  images: Images.find({}, {
    sort: {
      createdOn: -1,
      rating: -1,
    }
  })

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
  'click js-show-image-form':function(event){
    $("#imageFormModal").modal('show')

  }
});

Template.imageAddForm.events({
  'submit .js-add-image': function(event) {
    var img_src = event.target.img_src.value;
    var img_alt = event.target.img_alt.value;
    console.log(img_src + "\n" + img_alt)

    Images.insert({
      img_src: img_src,
      img_alt: img_alt,
      createdOn: new Date()
    })

    return false
  }
})
