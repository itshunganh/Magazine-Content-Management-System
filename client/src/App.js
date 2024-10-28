import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Alert from './components/layout/Alert'
import NavBar from './components/layout/NavBar'
import Login from './components/auth/Login'
import Issues from './components/issue/Issues'
import Issue from './components/issue/Issue'
import ArticleAdd from './components/article/ArticleAdd'
import ArticleEdit from './components/article/ArticleEdit'
import Author from './components/author/Author'
import NotFound from './components/layout/NotFound'
import PrivateRoute from './components/routing/PrivateRoute'

// Redux
import { Provider } from 'react-redux'
import { login } from './actions/auth'
import { LOGOUT } from './actions/types'
import setAuthToken from './utils/setAuthToken'
import store from './store'

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        store.dispatch(login())
        // Log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT })
        })
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <NavBar />
                <Alert />
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='issue/' element={<PrivateRoute component={Issues} />} />
                    <Route path='issue/:id' element={<PrivateRoute component={Issue} />} />
                    <Route path='article/add/:id' element={<PrivateRoute component={ArticleAdd} />} />
                    <Route path='article/edit/:id' element={<PrivateRoute component={ArticleEdit} />} />
                    <Route path='article/author' element={<PrivateRoute component={Author} />} />
                    <Route path='/*' element={<NotFound />} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
