import { userInfoAtom } from '@/storage/globalStorage';
import { useAtomValue } from 'jotai';

/**
 * 获取用户信息
 * @returns userInfo 用户信息
 */
function useUserInfo() {
    const userInfo = useAtomValue(userInfoAtom);

    return userInfo;
}

export default useUserInfo;
