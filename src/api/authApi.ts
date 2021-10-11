const authApi = {
  login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id : 1,
          name: 'nghialm'
        })
      }, 500);
    }); 
  }
}
export default authApi;