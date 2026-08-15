import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:radio',
      order: 1,
      title: '主播管理',
    },
    name: 'Streamer',
    path: '/streamer',
    component: () => import('#/views/business/streamer/index.vue'),
  },
];

export default routes;
