const listUsersUseCase = (userRepo) => ({

  listUsers: () => userRepo.listUsers(),
});

module.exports = listUsersUseCase;
