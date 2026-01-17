export const auth = {
    getToken: () => localStorage.getItem('token'),
    setToken: (token: string) => localStorage.setItem('token', token),
    logout: () => localStorage.removeItem('token'),
    isAuthenticated: () => !!localStorage.getItem('token'),
}
