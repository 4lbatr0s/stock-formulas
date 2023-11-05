import AxiosHelper from 'utils/helpers/AxiosHelper';
import UrlHelper from 'utils/helpers/UrlHelper';

export const fetchUserDetails = async () => {
  try {
    const response = await AxiosHelper.authorizedGetAsync(UrlHelper.getUserDetails());
    return response;
  } catch (error) {
    throw new Error(error?.message, error?.statusCode);
  }
};
