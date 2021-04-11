const cipher = {
  encode(offset, message) {
    message = message+offset;
    return message
  },
  decode(offset, message){
    message = message+offset;
    return message
  }
};

export default cipher;
