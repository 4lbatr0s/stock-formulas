export default class UserForRegistrationDto {
  constructor(email, password, fullname) {
    this.email = email;
    this.password = password;
    this.full_name = fullname;
  }
}
