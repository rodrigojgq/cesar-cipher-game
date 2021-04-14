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
      let originalLetter = message.charCodeAt(i);
      let codeLetter;
      let mayus = originalLetter > 64 && originalLetter < 91;
      let minus = originalLetter > 96 && originalLetter < 123;
      let simbols = originalLetter > 31 && originalLetter < 65;
      if(mayus || minus){
        if(offset < 0){
          offset = 26 + offset%26;
        }
      }else if(simbols){
        if(offset < 0){
          offset = 33 + offset%33;
        }
      }
      if (mayus){
        codeLetter = (originalLetter%65+offset)%26+65;
      }else if(minus){
        codeLetter = (originalLetter%97+offset)%26+97;
      }else if(simbols){
        codeLetter = (originalLetter%32+offset)%33+32;
        if(originalLetter == 64){
          codeLetter = (32+offset)%33+32;
        }
      }else{
        codeLetter = originalLetter;
      }
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
      let originalLetter = message.charCodeAt(i);
      let codeLetter;
      let mayus = originalLetter > 64 && originalLetter < 91;
      let minus = originalLetter > 96 && originalLetter < 123;
      let simbols = originalLetter > 31 && originalLetter < 65;
      let firstLetter = 0;
      let range = offset;
      if(mayus || minus){
        if(offset < 0){
          offset = 26 + offset%26;
        }
      }else if(simbols){
        if(offset < 0){
          offset = 33 + offset%33;
        }
      }
      if (mayus){
        firstLetter = 65;
        range = 26;
      } else if(minus){
        firstLetter = 97;
        range = 26;
      } else if(simbols){
        firstLetter = 32;
        range = 33;
      }
      if(offset === 0){
        range++;
      }
      codeLetter = originalLetter-(offset)%range;
      if ((codeLetter - firstLetter) < 0) {
          codeLetter = range+codeLetter;
      }
      result += String.fromCharCode(codeLetter);
    }
    return result;
  }
};

export default cipher;
