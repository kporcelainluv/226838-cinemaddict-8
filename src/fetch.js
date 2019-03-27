import "whatwg-fetch";
const authorizationKey = `Basic eo0w590ik29889a`;

const method = `GET`;
const body = null;
const headers = new Headers();
headers.append("Authorization", "Basic yukz590ik29889a");

const tranform = x => x;

export const getData = () => {
  return window
    .fetch(`https://es8-demo-srv.appspot.com/moowle/movies`, {
      method,
      body,
      headers
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Неизвестный статус: ${response.status} ${response.statusText}`
        );
      }
    })
    .then(json => {
      return tranform(json);
    });
};
