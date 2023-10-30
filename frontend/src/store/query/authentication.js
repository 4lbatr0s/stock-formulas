import AxiosHelper from 'utils/helpers/AxiosHelper';
import UrlHelper from 'utils/helpers/UrlHelper';

export const fetchUserById = async (userId) => {
  try {
    const response = await AxiosHelper.getAsync(UrlHelper.getUserById(userId));
    return response;
  } catch (error) {
    throw new Error(error?.message, error?.statusCode);
  }
};
