export const roleEnum = {
    ADMIN:"admin",
    USER:"user",
    MODERATOR:"moderator",
};

const roles = [roleEnum.USER, roleEnum.ADMIN, roleEnum.MODERATOR];

Object.freeze(roles);

export default roles;