function convertDateTimeFormat(inputDateTimeString) {
    const inputDate = new Date(inputDateTimeString);

    const day = inputDate.getUTCDate();
    const month = inputDate.getUTCMonth() + 1;
    const year = inputDate.getUTCFullYear();
    const hours = inputDate.getUTCHours();
    const minutes = inputDate.getUTCMinutes();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const outputDateTimeString = `${formattedHours}:${formattedMinutes} ${formattedDay}/${formattedMonth}/${year}`;

    return outputDateTimeString;
}

export {convertDateTimeFormat}