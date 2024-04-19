export const dateFormatter = (date: string): string => {
const newDate = new Date(date);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const hours = newDate.getHours();
const minutes = newDate.getMinutes();
const month = months[newDate.getMonth()];
const day = newDate.getDate();
const year = newDate.getFullYear();
const period = hours >= 12 ? 'PM' : 'AM';
const hour12 = hours % 12 || 12; // Convert 0 to 12

const formattedDate = `${hour12}:${minutes < 10 ? '0' : ''}${minutes} ${period}, ${month} ${day}, ${year}`;
return formattedDate;

}