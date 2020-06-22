Images = new Mongo.Collection("images")

Images.allow({
  insert: function(user_id, doc) {
    console.log("testing Security on Images: Insert");
    if (Meteor.user()) {
      if (user_id != doc.createdBy)
        return false
      else
        return true
    } else {
      return false
    }
  },
  remove: function(user_id, doc) {
    console.log("testing Security on Images: remove");
    if (Meteor.user()) {
      if (user_id != doc.createdBy)
        return false
      else
        return true
    } else {
      return false
    }
  },


})
