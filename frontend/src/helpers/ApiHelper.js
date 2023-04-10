export const getAsync = async (pathname, data) => {
    try {
      const { data: responseData } = await publicRequest.get(pathname, {
        params: Array.isArray(data) ? data : null,
      });
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }
  
  export const postAsync = async (pathname, data) => {
    try {
      const { data: responseData } = await userRequest.post(pathname, {
        params: Array.isArray(data) ? data : null,
      });
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }
  