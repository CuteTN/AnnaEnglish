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


/**
 * @param {"topics"|"games"|"exp"|"coins"} category 
 * @param {*} user 
 * @returns 
 */
export const getUserStats = (category, user) => {
  switch (category) {
    case "coins": return user?.stats?.coins ?? 0;
    case "exp": return user?.stats?.exp ?? 0;

    case "topics": return Object.values(user?.progress?.topics ?? {})
      .filter?.(topic => topic?.firstCompleteAt)?.length ?? 0;

    case "games": return Object.values(user?.progress?.topics ?? {})
      .map((topic) => Object.values(topic?.completedGames ?? {}).length)
      .reduce((cntGame1, cntGame2) => {
        return cntGame1 + cntGame2;
      }, 0);

    default: return null;
  }
}