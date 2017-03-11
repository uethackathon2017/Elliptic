import { Meteor } from 'meteor/meteor';
import { Categories } from '../imports/api/categories.js';
import { Books } from '../imports/api/books.js';
import { Reviews } from '../imports/api/reviews.js';
import { Comments } from '../imports/api/comments.js';

Meteor.startup(() => {
  // Reviews.remove({});
});

Meteor.AppCache.config({
  onlineOnly: ['/modules.js']
});
