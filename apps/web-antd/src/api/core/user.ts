import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息（si_land_server：GET /api/v1/admin/user/info）
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/admin/user/info');
}
