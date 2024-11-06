import useLocalStorage from '../useLocalStorage';

/**
 * 获取用户信息
 * @returns userInfo 用户信息
 */
function useUserInfo() {
    return useLocalStorage('user', null, process.env.REACT_APP_TOKEN_EXPIRES * 1000);
}

export default useUserInfo;
