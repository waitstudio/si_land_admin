import { requestClient } from '#/api/request';

/**
 * 主播收录与想看意愿（si_land_server admin 接口）
 */
export namespace StreamerApi {
  /** 已收录主播（streamers 表，snake_case 与后端一致） */
  export interface StreamerItem {
    avatar: string;
    douyin_id: string;
    id: string;
    live: boolean;
    live_started_at: null | number;
    nickname: string;
    popularity: number;
    sec_uid: string;
  }

  /** 想看意愿条目 */
  export interface WishItem {
    created_at: string;
    douyin_id: string;
    updated_at: string;
    want_count: number;
  }
}

/**
 * 按抖音号收录主播（POST /api/v1/admin/streamers）
 */
export async function addStreamerApi(douyinId: string) {
  return requestClient.post<StreamerApi.StreamerItem>('/admin/streamers', {
    douyin_id: douyinId,
  });
}

/**
 * 已收录主播列表（GET /api/v1/admin/streamers，按人气降序）
 */
export async function listStreamersApi() {
  return requestClient.get<StreamerApi.StreamerItem[]>('/admin/streamers');
}

/**
 * 想看意愿列表（GET /api/v1/admin/wishes，按想看人数降序）
 */
export async function listWishesApi(limit = 100) {
  return requestClient.get<StreamerApi.WishItem[]>('/admin/wishes', {
    params: { limit },
  });
}
