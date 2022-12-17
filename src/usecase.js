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

  async questionTwo() {
    const usernames = await this.repository.getUsernames();
    const capitalizedUsernames = this.repository.capitalizeFirstLetterOfFieldInList(usernames, 'username');
    await this.repository.updateUsernames(capitalizedUsernames);
    return 'Success';
  }
}

export default SEBEUsecase;
