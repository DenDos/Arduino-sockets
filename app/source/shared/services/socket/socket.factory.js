function SocketFactory (socketFactory) {
  return socketFactory();
}

SocketFactory.$inject = ['socketFactory'];

export default SocketFactory;
