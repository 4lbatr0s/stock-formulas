import AxiosHelper from 'utils/helpers/AxiosHelper';
import UrlHelper from 'utils/helpers/UrlHelper';
import RegistrationDTO from 'shared/DTOs/UserForRegistrationDto';
import UserForLoginDto from 'shared/DTOs/UserForLoginDto';

const registerUser = async ({ email, password, fullname }, { rejectWithValue }) => {
  try {
    await AxiosHelper.postAsync(UrlHelper.register(), new RegistrationDTO(email, password, fullname));
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

const userLogin = async ({ email, password }, { rejectWithValue }) => {
  try {
    return await AxiosHelper.postAsync(UrlHelper.login(), new UserForLoginDto(email, password));
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

const services = {
  registerUser,
  userLogin
};

export default services;
