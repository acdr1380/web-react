import useLocalStorage from '../useLocalStorage';

/**
 * 保存token信息
 * @returns useToken 验证信息
 */
function useToken() {
    return useLocalStorage(process.env.REACT_APP_TOKEN_KEY, null, process.env.REACT_APP_TOKEN_EXPIRES * 1000);
}

export default useToken;
