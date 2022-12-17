import SEBERepository from '#src/repository';

class SEBEUsecase {
  constructor() {
    this.repository = new SEBERepository();
  }

  async questionOne() {
    const users = await this.repository.getSortedPrivateGroupsUsers();
    const writeStatus = await this.repository.writePrivateGroupsUsersToCSV(users);
    return writeStatus;
  }

  questionTwo() {
    const capitalizeStatus = this.repository.capitalizeUserFirstNames();
    return capitalizeStatus;
  }
}

export default SEBEUsecase;
