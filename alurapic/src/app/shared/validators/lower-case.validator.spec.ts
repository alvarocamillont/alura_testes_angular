describe('A função lowerCaseValidator', () => {
  it('deve guardar um token', () => {
    const fakeToken = TOKEN;
    userService.setToken(fakeToken);
    expect(userService.isLogged()).toBeTruthy();
    expect(userService.getUserName()).toBe('flavio');
    userService.getUser().subscribe((user: User) => {
      expect(user.name).toBe('flavio');
    });
  });
});
