import { useLocalStorage } from '@/hooks';

/**
 * 获取用户信息
 * @returns userInfo 用户信息
 */
function useUserInfo() {
    return useLocalStorage('userInfo', {});
}

export default useUserInfo;
