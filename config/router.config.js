export default [
  // user
  {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
          { path: '/user', redirect: '/user/login' },
          { path: '/user/login', component: './User/Login' },
          { path: '/user/forgot', component: './User/Forgot' },
          { path: '/user/term', component: './User/Term' },
          { component: '404' },
      ],
  },
  // exception
  {
      path: '/exception',
      component: '../layouts/UserLayout',
      routes: [
          // exception
          {
              path: '/exception/403',
              component: './Exception/403',
          },
          {
              path: '/exception/404',
              component: './Exception/404',
          },
          {
              path: '/exception/500',
              component: './Exception/500',
          },
          { component: '404' },
      ],
  },
  // app
  {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['sa'],
      routes: [
          // dashboard
          { path: '/', redirect: '/dashboard' },
          {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              component: './Dashboard',
          },
          {
              path: '/subsidiary',
              name: 'subsidiary',
              icon: 'bank',
              component: './Subsidiary',
          },
          {
              path: '/subsidiary/program/:id',
              name: 'subsidiary',
              hideInMenu: true,
              component: './Program',
          },
          {
              path: '/account',
              name: 'account',
              icon: 'user',
              routes: [
                  {
                      path: '/account/users',
                      name: 'users',
                      component: './User/Users',
                  },
                  {
                      path: '/account/profile',
                      name: 'profile',
                      component: './User/Profile',
                  },
              ],
          },
          {
              path: '/settings',
              name: 'setting',
              icon: 'setting',
              routes: [
                  {
                      path: '/settings/general',
                      name: 'general',
                      component: './Setting',
                  },
              ],
          },
          {
              component: '404',
          },
      ],
  },
];
