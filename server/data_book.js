// import { Meteor } from 'meteor/meteor';
// import { Categories } from '../imports/api/categories.js';
// import { Books } from '../imports/api/books.js';
// import { Reviews } from '../imports/api/reviews.js';
// Meteor.startup(() => {
//   Categories.remove({});
//   Books.remove({});
//   Reviews.remove({});
//   var category_array = [
//     { "name": "Tri thức hiện đại", "createAt": new Date() },
//     { "name": "Nghiên cứu", "createAt": new Date() },
//     { "name": "Sức khỏe và đời sống", "createAt": new Date() },
//     { "name": "Sách tham khảo", "createAt": new Date() },
//     { "name": "Văn học", "createAt": new Date() },
//     { "name": "Sách thiên văn", "createAt": new Date() }
//   ];
//   var images_array = [
//    "images/data/1.jpg",
//    "images/data/5.jpg",
//    "images/data/9.jpg",
//    "images/data/10.jpg",
//    "images/data/2.jpg",
//    "images/data/11.jpg",
//    "images/data/7.jpg",
//    "images/data/8.jpg",
//    "images/data/3.jpg",
//    "images/data/4.jpg",
//    "images/data/6.png",
//    "images/data/12.jpg",
//    "images/data/13.jpg",
//    "images/data/14.jpg",
//    "images/data/15.jpg",
//    "images/data/16.jpg",
//    "images/data/17.jpg",
//    "images/data/18.jpg"
//   ];

//   var name_all_book = [
//     '23 vấn đề họ không nói với bạn về tư bản chủ nghĩa',
//     'Kinh tế học hài hước',
//     'Lời hứa về một cây bút chì',
//     'Nghịch lý của sự lựa chọn',
//     'Quá lớn để bỏ qua',
//     'Sức mạnh của thói quen',
//     'The hard thing about hard things',
//     'Trí tuệ xúc cảm',
//      'Talk like TED',
//     'Đắc nhân tâm',
//     'Tư duy nhanh và chậm',
//     'Từ tốt đến vĩ đại',
//      'Con đường hồi giáo',
//      'Dạy con làm giàu',
//      'Cuộc chiến cầu vồng',
//      'Mật mã do thái',
//      'Những nguyên tắc thành công',
//      'Trí tuệ Do Thái'
//   ];
//   for (var i = 0; i < category_array.length; i++) {
//     Categories.insert(category_array[i]);

//     var obj_id = Categories.findOne({ "name": category_array[i].name })._id;
//     //book
//     if (i % 2 == 0) {
//       for (var pos = name_all_book.length - 1; pos >= 0; pos --) {
//         var name_book = name_all_book[pos];
//         Books.insert({
//           "name": name_book, 
//           "category_id": obj_id,
//           "cover": images_array[pos],  
//           "createAt": new Date()
//         });
//       }
//     }
//     else if (i % 3 == 0 && i % 6 != 0) {
//       for (var pos = name_all_book.length - 8; pos >= 0; pos --) {
//         var name_book = name_all_book[pos];
//         Books.insert({
//           "name": name_book, 
//           "category_id": obj_id,
//           "cover": images_array[pos],  
//           "createAt": new Date()
//         });
//       }
//       for (var pos = name_all_book.length - 1; pos > name_all_book.length - 8; pos --) {
//         var name_book = name_all_book[pos];
//         Books.insert({
//           "name": name_book, 
//           "category_id": obj_id,
//           "cover": images_array[pos],  
//           "createAt": new Date()
//         });
//       }
//     }
//     else {
//       for (var pos = 0; pos < name_all_book.length; pos ++) {
//         var name_book = name_all_book[pos];
//         Books.insert({
//           "name": name_book, 
//           "category_id": obj_id,
//           "cover": images_array[pos],  
//           "createAt": new Date()
//         });
//       }
//     }
    
//   }
// });

