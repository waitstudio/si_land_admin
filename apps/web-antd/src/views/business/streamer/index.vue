<script lang="ts" setup>
import type { StreamerApi } from '#/api';

import { onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Avatar,
  Button,
  Card,
  Input,
  message,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import { addStreamerApi, listStreamersApi, listWishesApi } from '#/api';

// ---------- 收录主播表单 ----------
const douyinId = ref('');
const adding = ref(false);

async function handleAdd() {
  const id = douyinId.value.trim();
  if (!id) {
    message.warning('请输入抖音号');
    return;
  }
  adding.value = true;
  try {
    const streamer = await addStreamerApi(id);
    message.success(`已收录主播：${streamer.nickname}`);
    douyinId.value = '';
    await loadStreamers();
  } catch {
    // 错误提示由全局拦截器处理
  } finally {
    adding.value = false;
  }
}

// ---------- 已收录主播 ----------
const streamers = ref<StreamerApi.StreamerItem[]>([]);
const streamersLoading = ref(false);

async function loadStreamers() {
  streamersLoading.value = true;
  try {
    streamers.value = await listStreamersApi();
  } catch {
    // 错误提示由全局拦截器处理
  } finally {
    streamersLoading.value = false;
  }
}

const streamerColumns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 72,
  },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
  { title: '抖音号', dataIndex: 'douyin_id', key: 'douyin_id' },
  { title: '直播状态', dataIndex: 'live', key: 'live', width: 100 },
  { title: '人气', dataIndex: 'popularity', key: 'popularity', width: 90 },
  { title: '主播 ID', dataIndex: 'id', key: 'id', width: 220 },
];

// ---------- 想看意愿 ----------
const wishes = ref<StreamerApi.WishItem[]>([]);
const wishesLoading = ref(false);

async function loadWishes() {
  wishesLoading.value = true;
  try {
    wishes.value = await listWishesApi();
  } catch {
    // 错误提示由全局拦截器处理
  } finally {
    wishesLoading.value = false;
  }
}

const wishColumns = [
  { title: '抖音号', dataIndex: 'douyin_id', key: 'douyin_id' },
  { title: '想看人数', dataIndex: 'want_count', key: 'want_count', width: 120 },
  {
    title: '最近提交',
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 180,
  },
  { title: '操作', key: 'action', width: 100 },
];

// 从想看列表快捷收录
const wishing = reactive<Record<string, boolean>>({});

async function handleAddFromWish(douyinId: string) {
  wishing[douyinId] = true;
  try {
    const streamer = await addStreamerApi(douyinId);
    message.success(`已收录主播：${streamer.nickname}`);
    await Promise.all([loadStreamers(), loadWishes()]);
  } catch {
    // 错误提示由全局拦截器处理
  } finally {
    wishing[douyinId] = false;
  }
}

// ---------- 刷新数据 ----------
const refreshing = ref(false);

async function handleRefresh() {
  refreshing.value = true;
  try {
    await Promise.all([loadStreamers(), loadWishes()]);
    message.success('数据已刷新');
  } catch {
    // 错误提示由全局拦截器处理
  } finally {
    refreshing.value = false;
  }
}

function formatTime(v: string) {
  return v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-';
}

onMounted(() => {
  loadStreamers();
  loadWishes();
});
</script>

<template>
  <Page
    description="收录主播到热门列表，App 端用户即可订阅并接收开播通知"
    title="主播管理"
  >
    <!-- 按抖音号收录主播 -->
    <Card class="mb-4" title="收录主播">
      <Space>
        <Input
          v-model:value="douyinId"
          :maxlength="20"
          allow-clear
          placeholder="输入主播抖音号（短号，非链接 / 分享口令）"
          style="width: 320px"
          @press-enter="handleAdd"
        />
        <Button :loading="adding" type="primary" @click="handleAdd">
          收录主播
        </Button>
        <Button :loading="refreshing" @click="handleRefresh">刷新数据</Button>
      </Space>
    </Card>

    <Card>
      <Tabs>
        <!-- 已收录主播 -->
        <Tabs.TabPane key="streamers" tab="已收录主播">
          <Table
            :columns="streamerColumns"
            :data-source="streamers"
            :loading="streamersLoading"
            :pagination="false"
            row-key="id"
            size="middle"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'avatar'">
                <Avatar :src="record.avatar" shape="square">
                  {{ record.nickname.slice(0, 1) }}
                </Avatar>
              </template>
              <template v-else-if="column.key === 'live'">
                <Tag :color="record.live ? 'red' : 'default'">
                  {{ record.live ? '直播中' : '未开播' }}
                </Tag>
              </template>
              <template v-else-if="column.key === 'id'">
                <Tooltip :title="record.id">
                  <span class="text-xs">{{ record.id }}</span>
                </Tooltip>
              </template>
            </template>
          </Table>
        </Tabs.TabPane>

        <!-- 想看意愿 -->
        <Tabs.TabPane key="wishes" tab="想看意愿">
          <Table
            :columns="wishColumns"
            :data-source="wishes"
            :loading="wishesLoading"
            :pagination="false"
            row-key="douyin_id"
            size="middle"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'updated_at'">
                {{ formatTime(record.updated_at) }}
              </template>
              <template v-else-if="column.key === 'action'">
                <Button
                  :loading="wishing[record.douyin_id]"
                  size="small"
                  type="primary"
                  @click="handleAddFromWish(record.douyin_id)"
                >
                  收录
                </Button>
              </template>
            </template>
          </Table>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  </Page>
</template>
