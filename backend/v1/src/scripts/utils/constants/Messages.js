const Messages = {
  ERROR: {
    USER_NOT_FOUND: 'USER NOT FOUND!',
    WRONG_CREDENTIAL: 'WRONG CREDENTIALS!',
    RECORD_NOT_FOUND: 'RECORD NOT FOUND',
    PAGE_NOT_FOUND: 'PAGE NOT FOUND',
    BAD_ID_FORMAT: 'PLEASE USE A VALID ID',
    BAD_STOCK_SYMBOL: 'PLEASE USE A VALID STOCK SYMBOL',
    STOCK_SYMBOL_REQUIRED: 'PLEASE USE A STOCK SYMBOL',
    STOCK_SYMBOL_NOT_FOUND: 'STOCK SYMBOL NOT FOUND',
    TOKEN_EXPIRED:'TOKEN IS EXPIRED',
    UNAUTHORIZED:'YOU ARE UNAUTHORIZED',
    FORBIDDEN:'PERMISSION DENIED',
    USERNAME_IN_USE:'USERNAME ALREADY IN USE',
    EMAIL_IN_USE:'EMAIL ALREADY IN USE',
    TOKEN_REQUIRED:'TOKEN IS REQURED',
    TOKEN_NOT_IN_DB:'REFRESH TOKEN NOT RECOGNIZED',
    RESIGN:'Refresh token was expired. Please make a new signin request',
    EMAIL_NOT_FOUND:"EMAIL_NOT_FOUND",
    roleNotExist: (role) => {
      return `Failed! Role ${role} does not exist!`;
    }
  },
};

export default Messages;
