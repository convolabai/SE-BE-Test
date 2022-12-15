import SEBERepository from '#src/repository';

class SEBEUsecase {
  constructor() {
    this.repository = new SEBERepository();
  }

  questionOne() {
    const users = this.repository.getSortedPrivateGroupsUsers();
    const writeStatus = this.repository.writePrivateGroupsUsersToCSV(users);
    return writeStatus;
  }

  questionTwo() {
    const capitalizeStatus = this.repository.capitalizeUserFirstNames();
    return capitalizeStatus;
  }
}

export default SEBEUsecase;
