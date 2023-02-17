import moment from "moment";

export function formatDate(date) {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
}
