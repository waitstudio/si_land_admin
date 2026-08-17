# si_land_admin

矽澜（si_land）管理后台，基于 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)（v5，Ant Design Vue 版本）构建。

配套项目：[si_land_server](https://github.com/waitstudio/si_land_server)（Rust 后端） / [si_land_client](https://github.com/waitstudio/si_land_client)（Flutter 移动端）。

## 功能特性

### 管理员认证
- 管理员账号密码登录，JWT 鉴权
- 管理员与普通用户接口按前缀隔离，服务端双层校验

### 主播管理
- 主播列表：查看平台内全部主播及其人气、订阅与开播信息
- 手动添加主播：输入抖音号，自动完成解析（昵称 / 头像 / sec_uid / 开播状态）→ 查重 → 入库 → 创建轮询任务的完整流程
- 添加成功后主播自动进入轮询调度，向订阅用户推送开播通知

## 技术栈

Vue 3 · Ant Design Vue · Vite · TypeScript · pnpm monorepo（基于 vue-vben-admin v5）

## 运行流程

环境要求：Node.js 20+、pnpm 9+；需先启动 [si_land_server](https://github.com/waitstudio/si_land_server)。

```bash
# 1. 安装依赖（monorepo 根目录）
pnpm install

# 2. 启动 web-antd 应用（默认 http://localhost:5666）
pnpm dev:antd
```

说明：
- 开发模式下 `/api` 自动代理到 `http://127.0.0.1:8080/api/v1`，无需额外配置。
- 登录账号为后端 `.env` 中配置的 `ADMIN_USERNAME` / `ADMIN_PASSWORD`。

## 致谢

本项目基于开源项目 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 二次开发，感谢上游作者与贡献者。

## 免责声明

1. 本项目**仅供个人学习与技术研究用途**，严禁用于任何商业用途或违法违规用途。
2. 本项目涉及对第三方平台（抖音）数据的访问与解析，相关实现仅用于技术研究演示。使用者应遵守抖音平台的相关服务条款，不得对平台服务造成干扰或滥用其接口。
3. 本项目不提供任何明示或默示的保证，不对数据的准确性、完整性与时效性作任何承诺。使用者因使用本项目产生的任何直接或间接损失，作者不承担任何责任。
4. 开播状态、主播信息等数据版权归原平台及主播所有。若相关权利人认为本项目侵犯了其合法权益，请通过 Issue 联系，核实后将及时处理。
5. 使用本项目产生的任何行为与后果，均由使用者本人承担。请在使用前了解并遵守您所在地区及目标平台适用的法律法规。
