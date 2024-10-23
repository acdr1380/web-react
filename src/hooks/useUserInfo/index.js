import { useSelector } from 'react-redux';

/**
 * 获取用户信息
 * @returns userInfo 用户信息
 */
function useUserInfo() {
    return useSelector(state => state.global.userInfo);
}

export default useUserInfo;
