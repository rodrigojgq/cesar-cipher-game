const cipher = {
  encode(offset, message) {
    if(typeof(offset) != 'number'){
      throw new TypeError();
    }
    if(typeof(message) != 'string'){
      throw new TypeError();
    }
    let result = '';
    for(let i = 0; i<message.length; i++){
      let codeLetter = (message.charCodeAt(i)%65+offset)%26+65;
      result += String.fromCharCode(codeLetter);
    }
    return result;
  },
  decode(offset, message){
    if(typeof(offset) != 'number'){
      throw new TypeError();
    }
    if(typeof(message) != 'string'){
      throw new TypeError();
    }
    let result = '';
    for(let i = 0; i<message.length; i++){
      let codeLetter = message.charCodeAt(i)-(offset)%26;
      if ((codeLetter - 65) < 0) {
        codeLetter = 26+codeLetter;
      }
      result += String.fromCharCode(codeLetter);
    }
    return result;
  }
};

export default cipher;
