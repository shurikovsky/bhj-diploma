/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {})=> {
  let url = options.url; // адрес
  const xhr = new XMLHttpRequest;
  xhr.responseType = "json";
  let method = options.method;
  let data = options.data;
  if (options.method) {
      if (method === "GET") {
         url += "?";
         for (let key in data) {
           url += key + "=" + data[key] + "&";
         }
         try {
          xhr.open(method, url);
         } catch (err) {
            return err
         }
      } else {
        this.formData = new FormData;
          for (let key in data) {
            formData.append(key, data[key]);
          }
          try {
            xhr.open(method, options.url);    
          } catch (err) {
              return err
          } 
      }
  }
  
  xhr.addEventListener('load', () => {
    if (this.readyState == xhr.DONE && xhr.status === 200) {
      options.callback(xhr.response.error, xhr.response);
    }  
  })
  xhr.send((method === "GET") ? '' : formData);
}    
 
