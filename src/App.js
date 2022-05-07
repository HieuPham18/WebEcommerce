import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext'
import { DataContextProvider } from './context/DataContext';
import HomePageLayout from './layouts/HomePageLayout';
import IntroducePageLayout from './layouts/IntroducePageLayout'
import ProductInfoLayout from './layouts/ProductInfoLayout';
import GuaranteePageLayout from './layouts/GuaranteePageLayout';
import CheckOrderPageLayout from './layouts/CheckOrderPageLayout';
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import ProductInfoPage from './pages/ProductInfoPage'
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage';
import IntroducePage from './pages/IntroducePage';
import GuaranteePage from './pages/GuaranteePage';
import CheckOrderPage from './pages/CheckOrderPage';
import CategorySlug from './components/CategorySlug';
import CheckoutPageLayout from './layouts/CheckoutPageLayout';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import './stylesheets/responsive.scss'
import SlidePage from './pages/slidePage';
import MiniDrawer from './pages/test'
import AdminUpdate from './components/AdminUpdate'
import AdminProducts from './components/AdminProducts'

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <DataContextProvider>
          <Routes>

            <Route path="/" exact element={
              <HomePageLayout>
                <HomePage />
              </HomePageLayout>}
            />

            <Route path="/introduce" exact element={
              <IntroducePageLayout>
                <IntroducePage />
              </IntroducePageLayout>}
            />

            <Route path="/guarantee" exact element={
              <GuaranteePageLayout>
                <GuaranteePage />
              </GuaranteePageLayout>}
            />

            <Route path="/checkorder" exact element={
              <CheckOrderPageLayout>
                <CheckOrderPage />
              </CheckOrderPageLayout>}
            />

            <Route path="/:category/:categorySlug/:slug" exact element={
              <ProductInfoLayout>
                <ProductInfoPage />
              </ProductInfoLayout>}
            />

            <Route path="/cart" exact element={
              <HomePageLayout>
                <CartPage />
              </HomePageLayout>}
            />

            <Route path="/:category" exact element={
              <HomePageLayout>
                <CategoryPage />
              </HomePageLayout>}
            />

            {/* <Route path="/lap-top/:categorySlug" exact element={ */}
            <Route path="/:category/:categorySlug" exact element={
              <HomePageLayout>
                <CategorySlug />
              </HomePageLayout>}
            />

            <Route path="/test" exact element={
              // <HomePageLayout>
              <MiniDrawer />
              // </HomePageLayout>
            }
            />

            <Route path="/checkout" exact element={
              <CheckoutPageLayout>
                <CheckoutPage />
              </CheckoutPageLayout>}
            />

            <Route path="/login" exact element={
              <LoginPage />
            }
            />

            <Route path="/register" exact element={
              <RegisterPage />
            }
            />

            <Route path="/slide" exact element={
              <SlidePage />
            }
            />

            <Route path="/admin" exact element={
              <AdminPage />
            } />

            <Route path="/admin/:slugAdmin" exact element={
              <AdminPage />
            } />

            <Route path="/history-order" exact element={
              <OrderHistoryPage />
            } />
          </Routes>
        </DataContextProvider>
      </UserAuthContextProvider>
    </div>
  )
}

export default App;
