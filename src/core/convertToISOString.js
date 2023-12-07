function convertToISOString(inputDateString) {
    // Tạo đối tượng ngày từ chuỗi đầu vào
    var inputDate = new Date(inputDateString);
  
    // Lấy các thành phần của ngày giờ
    var year = inputDate.getFullYear();
    var month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    var day = inputDate.getDate().toString().padStart(2, '0');
    var hours = inputDate.getHours().toString().padStart(2, '0');
    var minutes = inputDate.getMinutes().toString().padStart(2, '0');
    var seconds = inputDate.getSeconds().toString().padStart(2, '0');
    var milliseconds = inputDate.getMilliseconds().toString().padStart(3, '0');
  
    // Định dạng chuỗi đầu ra
    var outputDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  
    return outputDateString;
  }

  export default convertToISOString