import { Meteor } from 'meteor/meteor';
import { Categories } from '../imports/api/categories.js';
import { Books } from '../imports/api/books.js';
import { Reviews } from '../imports/api/reviews.js';

Meteor.startup(() => {
  // Categories.remove({});
  // Books.remove({});
  // Reviews.remove({});
  // var category_array = [
  //   { "name": "Tri thức hiện đại", "createAt": new Date() },
  //   { "name": "Nghiên cứu", "createAt": new Date() },
  //   { "name": "Sức khỏe và đời sống", "createAt": new Date() },
  //   { "name": "Sách tham khảo", "createAt": new Date() },
  //   { "name": "Văn học", "createAt": new Date() },
  //   { "name": "Nghiên cứu", "createAt": new Date() }
  // ];
  // var images_array = [
  //  "images/data/1.jpg",
  //  "images/data/2.jpg",
  //  "images/data/3.jpg",
  //  "images/data/4.jpg",
  //  "images/data/5.jpg",
  //  "images/data/6.png",
  //  "images/data/7.jpg",
  //  "images/data/8.jpg",
  //  "images/data/9.jpg",
  //  "images/data/10.jpg",
  //  "images/data/11.jpg",
  //  "images/data/12.jpg",
  //  "images/data/13.jpg",
  //  "images/data/14.jpg",
  // ];

  // var name_all_book = [
  //   '23 vấn đề họ không nói với bạn về tư bản chủ nghĩa',
  //   'Đắc nhân tâm',
  //   'Kinh tế học hài hước',
  //   'Lời hứa về một cây bút chì',
  //   'Nghịch lý của sự lựa chọn',
  //   'Quá lớn để bỏ qua',
  //   'Sức mạnh của thói quen',
  //   'The hard thing about hard things',
  //   'Trí tuệ xúc cảm',
  //   'Tư duy nhanh và chậm',
  //   'Từ tốt đến vĩ đại'
  // ];

  // var content = "<p>Cuốn s&aacute;ch n&agrave;y chủ yếu n&oacute;i về những th&agrave;nh c&ocirc;ng của từng c&aacute; nh&acirc;n sống trong th&agrave;nh Babylon cổ đại, m&agrave; cụ thể l&agrave; đề cập đến th&agrave;nh quả m&agrave; họ đạt được. Từ đ&oacute; gi&uacute;p mọi người <b>hiểu r&otilde; vấn đề t&agrave;i ch&iacute;nh v&agrave; đưa ra những phương ph&aacute;p</b> cho những người ng&agrave;y đ&ecirc;m trăn trở, suy tư về c&aacute;ch l&agrave;m gi&agrave;u. Những b&iacute; quyết n&agrave;y kh&ocirc;ng những gi&uacute;p c&aacute;c bạn <b>đ&aacute;nh gi&aacute; đ&uacute;ng gi&aacute; trị của tiền bạc</b>, m&agrave; c&ograve;n <b>hướng dẫn c&aacute;c bạn thực h&agrave;nh</b> theo những nguy&ecirc;n l&yacute; t&agrave;i ch&iacute;nh l&agrave;nh mạnh khi <b>l&agrave;m ra tiền, giữ g&igrave;n v&agrave; kiếm th&ecirc;m nhiều tiền bạ</b></p><p><b>1.Những người đ&agrave;n &ocirc;ng ham v&agrave;ng</b></p><p>Kobbi v&agrave; Bansir l&agrave; hai người bạn th&acirc;n ngh&egrave;o khổ nhưng trong họ lu&ocirc;n&nbsp;c&oacute; sự nhận thức v&agrave; khao kh&aacute;t gi&agrave;u c&oacute;. Điều đ&oacute; th&ocirc;i th&uacute;c họ t&igrave;m đến người gi&agrave;u c&oacute; nhất th&agrave;nh Babylon để xin lời khuy&ecirc;n v&agrave; nhờ &ocirc;ng chỉ bảo về những c&aacute;ch thức l&agrave;m gi&agrave;u.</p><p><b>2. Người gi&agrave;u c&oacute; nhất th&agrave;nh Babylon</b></p><p>Arkad đ&atilde; kể về c&acirc;u chuyện l&agrave;m gi&agrave;u của m&igrave;nh từ những ng&agrave;y &ocirc;ng c&ograve;n l&agrave; một người l&agrave;m c&ocirc;ng ngh&egrave;o kh&oacute;.</p><p>&Yacute; ch&iacute; mạnh mẽ l&agrave; điều đầu ti&ecirc;n mọi người cần c&oacute;. Sức mạnh &yacute; ch&iacute; ch&iacute;nh l&agrave;&nbsp;theo đuổi đến c&ugrave;ng mục ti&ecirc;u c&ocirc;ng việc của m&igrave;nh. Ngay khi t&ocirc;i đặt cho m&igrave;nh một mục ti&ecirc;u n&agrave;o đ&oacute;, t&ocirc;i nhất quyết phải ho&agrave;n th&agrave;nh n&oacute;. Cũng do vậy, t&ocirc;i rất thận trọng khi đề ra những mục ti&ecirc;u cho m&igrave;nh nhưng một khi đ&atilde; c&oacute; mục ti&ecirc;u th&igrave; nhất quyết phải ho&agrave;n th&agrave;nh.</p>";
  // var content_description = "Jim Collin thấy rằng việc xuất bản cuốn sách sau 5 năm nghiên cứu là hoàn toàn xứng đáng.Sau nhiều năm ẩn mình, ông rất muốn nghe mọi người kể về những gì có thể áp dụng được cho bản thân họ, và những gì không phù hợp. Ông hy vọng rằng những trang sách này có giá trị và những người đọc nó sẽ quyết tâm áp dụng những gì đã học vào bất cứ điều gì họ làm Jim Collin thấy rằng việc xuất bản cuốn sách sau 5 năm nghiên cứu là hoàn toàn xứng đáng.Sau nhiều năm ẩn mình, ông rất muốn nghe mọi người kể về những gì có thể áp dụng được cho bản thân họ, và những gì không phù hợp. Ông hy vọng rằng những trang sách này có giá trị và những người đọc nó sẽ quyết tâm áp dụng những gì đã học vào bất cứ điều gì họ làm";
  // for (var i = 0; i < category_array.length; i++) {
  //   Categories.insert(category_array[i]);

  //   var obj_id = Categories.findOne({ "name": category_array[i].name })._id;
  //   //book
  //   for(var pos = 0; pos < name_all_book.length; pos ++) {
  //     var name_book = name_all_book[pos];
  //     Books.insert({
  //       "name": name_book, 
  //       "category_id": obj_id,
  //       "cover": images_array[pos],  
  //       "createAt": new Date()});
  //     var bookId = Books.findOne({"name": name_book});
  //     //review
  //     for(var j = 0; j < 6 ; j++) {
  //       var tmp = content_description; 
  //       Reviews.insert({
  //         "name": bookId.name, 
  //         "book_id": bookId._id, 
  //         "star": "3",
  //         "description": tmp,
  //         "user_rate": "100",  
  //         "content": content
  //       });
  //     }
  //   } 
  // }
});

