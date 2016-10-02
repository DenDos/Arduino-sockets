class TestController {
  constructor($scope, $stateParams, TestService) {
    this.TestService = TestService;
    this.get_users();
  }

  $onInit() {
  }

  get_users() {
    this.TestService.getUsers()
    .then((response)=>{
      this.users = response.data.users;
    })
  }
}

TestController.$inject = ['$scope', '$stateParams', "TestService"]

export default TestController;
