/**
 * @param {object} user 
 * @returns {{isValid: boolean, message: string}}
 */
export const checkEnoughUserInfo = (user) => {
  const falseResult = (message) => ({
    isValid: false,
    message,
  })

  if (!user)
    return falseResult("Đã xảy ra lỗi");

  if (!user.name)
    return falseResult("Bạn chưa nhập tên");

  if (!user.birthday)
    return falseResult("Bạn chưa nhập ngày sinh");

  if (!user.country)
    return falseResult("Bạn chưa nhập quốc tịch");

  if (!user.gender)
    return falseResult("Bạn chưa nhập giới tính");

  return {
    isValid: true,
  };
}