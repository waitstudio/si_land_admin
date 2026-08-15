import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 *
 * si_land_server 返回空列表（菜单由前端路由模块定义，frontend accessMode）。
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>('/admin/menu/all');
}
