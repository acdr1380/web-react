import { useLocalStorage } from '@/hooks';

function useUserInfo() {
    const [userInfo] = useLocalStorage('user');

    return userInfo;
}

export default useUserInfo;
