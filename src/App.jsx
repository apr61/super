import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import WriteAReview from "./pages/WriteAReview"
import MainLayout from "./routelayouts/MainLayout"
import ContextLayout from './routelayouts/ContextLayout'
import WriteAReviewFormPage from "./pages/WriteAReviewFormPage"
import { useAuthContext } from "./context/AuthContext"
import AddNewBusinessPage from "./pages/AddNewBusinessPage"
import AddNewBusinessProvider from "./context/AddNewBusiness"
import RequireAuth from "./routelayouts/RequireAuth"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import MyBusinesses from "./pages/MyBusinesses"
import BusinessProvider from "./context/Businesses"
import SingleBusiness from "./pages/SingleBusiness"
import Search from "./pages/Search"
import PageNotFound from "./components/PageNotFound"

function App() {
  const { currentUser } = useAuthContext()
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<ContextLayout provider={BusinessProvider} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/writeareview" element={<WriteAReview />} />
            <Route element={<RequireAuth />}>
              <Route path="/writeareview/:businessId" element={<WriteAReviewFormPage />} />
            </Route>
            <Route path="/business">
              <Route element={<RequireAuth />}>
                <Route element={<ContextLayout provider={AddNewBusinessProvider} />} >
                  <Route path="new" element={<AddNewBusinessPage />} />
                </Route>
                <Route path="my" element={<MyBusinesses />} />
              </Route>
              <Route path=":businessName" element={<SingleBusiness />} />
            </Route>
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/login" element={currentUser ? <Navigate to='/' /> : <Login />} />
          <Route path="/signup" element={currentUser ? <Navigate to='/' /> : <SignUp />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
