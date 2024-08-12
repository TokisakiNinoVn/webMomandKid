import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductKidDetail from '../components/ProductKidDetail.vue';
import ProductMomDetail from '../components/ProductMomDetail.vue';
import CartView from '../views/CartView.vue';
import Login from '../components/AppLogin.vue';
import Register from '../components/AppRegister.vue';
import SearchResults from '../views/SearchResults.vue';
import Profile from '../views/ProfileView.vue';
import CheckoutView from '../views/CheckoutView.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/kid/:id', name: 'ProductKidDetail', component: ProductKidDetail },
  { path: '/product/mom/:id', name: 'ProductMomDetail', component: ProductMomDetail },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/search', name: 'SearchResults', component: SearchResults },
  { path: '/checkout', name: 'CheckoutView', component: CheckoutView },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!JSON.parse(localStorage.getItem('user'));
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
