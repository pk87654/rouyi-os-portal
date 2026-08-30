export interface DocItem {
  id: string
  title: string
  desc?: string
  content?: {
    lead?: string
    sections: {
      title: string
      body: string
      table?: { headers: string[]; rows: string[][] }
      code?: { lang: string; snippet: string }
    }[]
  }
}

export interface DocGroup {
  title: string
  items: DocItem[]
}

export interface DocCategory {
  id: string
  name: string
  groups: DocGroup[]
}

export const multiSidebars: Record<string, DocCategory> = {
  // 1. 快速开始 (对照截图 1)
  'quick-start': {
    id: 'quick-start',
    name: '快速开始',
    groups: [
      {
        title: '快速开始',
        items: [
          {
            id: 'start',
            title: '快速启动文档',
            desc: '使用 IDEA 将后端项目运行起来，并启动前端页面进行体验。预计 15~30 分钟即可完成。',
            content: {
              lead: '使用 IDEA 将后端项目运行起来，并启动前端页面进行体验。整个过程非常简单，预计 15~30 分钟即可完成（取决于网络下载速度）。',
              sections: [
                {
                  title: '一、环境准备',
                  body: '在开始之前，请确保本机已安装以下环境：',
                  table: {
                    headers: ['环境', '版本要求', '说明'],
                    rows: [
                      ['JDK', '17 或 21', '推荐使用 OpenJDK 17 / GraalVM'],
                      ['Maven', '3.8+', '用于后端项目构建'],
                      ['Node.js', '18+', '用于前端项目构建'],
                      ['pnpm', '9.x+ / 11.x', '前端包管理器'],
                      ['PostgreSQL', '16.0+', '核心数据存储（必须具备 JSONB 原生支持）'],
                      ['Redis', '7.0+', '缓存与 Sa-Token 会话'],
                      ['IDEA', '2023+', '推荐使用 IntelliJ IDEA']
                    ]
                  }
                },
                {
                  title: '二、克隆代码与工程目录',
                  body: '从仓库克隆后端主工程与 PC 前端工程：',
                  code: {
                    lang: 'bash',
                    snippet: `# 1. 克隆后端工程\ngit clone https://gitee.com/ruiyi/ruiyi-boot4-pro.git\n\n# 2. 克隆前端工程\ngit clone https://gitee.com/ruiyi/ruiyi-web-vue3.git`
                  }
                },
                {
                  title: '三、初始化基础设施 (Docker 方式推荐)',
                  body: '运行 docker-compose up -d 一键拉起 PostgreSQL 16 与 Redis 7 容器。'
                }
              ]
            }
          }
        ]
      },
      {
        title: '部署文档',
        items: [
          {
            id: 'deploy-options',
            title: '部署选型',
            desc: '单体轻量部署 vs Docker 容器化微服务部署选型对比。',
            content: {
              lead: '针对工厂车间本地服务器配置与云端私有化部署要求，提供两种标准化部署路径。',
              sections: [
                {
                  title: '一、单体与容器化选型',
                  body: '中小型机加车间推荐采用单体 Jar + 本地 PG16 部署，极低内存开销；多工厂协同推荐 Docker 容器化编排。'
                }
              ]
            }
          },
          { id: 'standalone-deploy', title: '单体部署', desc: '单 Jar 包一键启动指南与 systemd 守护进程配置。' },
          { id: 'microservice-deploy', title: 'Docker 容器部署', desc: '基于 Dockerfile 与 docker-compose 的标准化交付。' },
          { id: 'windows-deploy', title: 'Windows 服务器部署', desc: '工厂 Windows Server 本地服务器安装与开机自启。' },
          { id: 'jenkins-pipeline', title: 'Jenkins CI/CD 流水线', desc: '自动化构建、代码质检与现场更新流水线。' }
        ]
      },
      {
        title: '上线文档',
        items: [
          { id: 'production-overview', title: '上线文档总览', desc: '生产环境正式上线安全基线与核验清单。' },
          { id: 'security-baseline', title: '关闭演示与安全基线', desc: '关闭 Swagger、重设初始密码与 Sa-Token 秘钥。' },
          { id: 'logo-custom', title: 'Logo、系统名称等配置', desc: '车间品牌定制、系统名与工位机标识配置。' },
          { id: 'menu-theme-layout', title: '个性化主题菜单布局', desc: '车间大字号与侧边栏布局定制。' },
          { id: 'storage-onlyoffice', title: '域名、存储与 OnlyOffice', desc: '工业图纸在线预览与 MinIO / 阿里云 OSS 配置。' },
          { id: 'acceptance-checklist', title: '上线验收清单', desc: '工单扫码、报工、质检与仓储完整验收流程。' },
          { id: 'android-apk', title: 'Android APK 与 PDA 打包', desc: 'UniApp 生成 APK 并安装至工业扫码手持机。' }
        ]
      }
    ]
  },

  // 2. 产品功能 (对照截图 产品功能 / 概述)
  'product': {
    id: 'product',
    name: '产品功能',
    groups: [
      {
        title: '总体架构',
        items: [
          {
            id: 'overview',
            title: '产品概述',
            desc: '面向离散制造与机加工的「一体化、工艺驱动、全闭环」数字制造平台。',
            content: {
              lead: '睿易制造平台（Ruiyi MDP）是面向中小型制造企业、多工厂打造的「一站式、全流程、多终端」数字化制造执行与排产平台。平台以「工艺驱动 + 现场防呆 + 计划中枢」为设计理念，打通人、机、料、法、环五大要素。',
              sections: [
                {
                  title: '核心价值',
                  body: '以下为平台的核心价值点与设计说明：',
                  table: {
                    headers: ['价值点', '价值说明'],
                    rows: [
                      ['一体化', '单一平台覆盖 PLM、MES、APS、QMS、WMS、Tool 刀具、ERP，避免多套系统数据孤岛。'],
                      ['工艺快照', '工单下发自动冻结 SHA-256 工艺快照（JSONB 存储），在制工单彻底隔离设计变更。'],
                      ['多端协同', 'PC 管理后台 + 21.5寸工位屏 (DPX) + 仓储 PDA + 4K 生产大屏，一套账号贯通全端。'],
                      ['SaaS 多租户', '原生多租户与多工厂架构，强隔离数据权限，适配集团化管理。'],
                      ['AI 能力内置', '规范分层架构，集成 AI 工艺推荐、排程建议与专属 Coding Skills。'],
                      ['开放扩展', '100% 完整源码交付 + 代码生成器 + Sa-Token，客户可自由二次开发。']
                    ]
                  }
                }
              ]
            }
          },
          { id: 'biz-architecture', title: '业务架构', desc: '19 个核心业务模块的职责与边界划分。' },
          { id: 'tech-architecture', title: '技术架构', desc: 'Spring Boot 4 + PG16 + Sa-Token + Flowable 8 技术栈。' },
          { id: 'deploy-architecture', title: '部署架构', desc: '物理网络拓扑、车间工位机局域网与云端协同。' },
          { id: 'ext-architecture', title: '集成与扩展架构', desc: 'PLC 工业数采、扫码枪 HID 与第三方 ERP 对接。' },
          {
            id: 'mouldlink',
            title: '睿易模界 · 模具协同 (MouldLink)',
            desc: 'MouldLink · Mould Manufacturing Collaboration Platform 模具制造协同平台 V0.1 总体设计总纲。',
            content: {
              lead: '「睿易模界」（MouldLink · Mould Manufacturing Collaboration Platform）是面向注塑模、冲压模、压铸模及精密工装夹具企业打造的「单件小批量、项目穿透、外协协同、试模闭环」模具制造协同平台。',
              sections: [
                {
                  title: '一、产品定位与核心目标',
                  body: '本系统不是单纯 ERP，也不是单纯 MES，而是以 Mould Project（模具项目）为第一业务对象，将客户询价、报价、立项、节点、设计、BOM、采购、工艺、模具零件、内部加工、外协协同、品质、装配、试模、整改、交付和项目成本串成完整业务链。\n\n核心目标：任何时候打开一个模具项目，都能回答：做到哪里、谁在做、在哪台设备做、哪些零件有风险、哪些外协延期、下一节点是什么、距离交付还有多少工作。',
                  table: {
                    headers: ['品牌维度', '官方规范'],
                    rows: [
                      ['中文品牌', '睿易模界'],
                      ['英文品牌', 'MouldLink'],
                      ['产品全称', '睿易模界 · 模具制造协同平台'],
                      ['英文全称', 'MouldLink · Mould Manufacturing Collaboration Platform'],
                      ['核心主线', '模具项目全生命周期 + 厂内制造 + 外协协同 + 质量/试模闭环'],
                      ['设计原则', '任务驱动、项目穿透、内外协同、扫码优先、数据留痕、模块解耦']
                    ]
                  }
                },
                {
                  title: '二、第一版五个重点差异化能力',
                  body: '1. 项目进度真正穿透：项目 → 零件 → 工序 → 设备/供应商 → 执行记录逐级穿透。\n2. 内部与外协统一可视：外协不再是采购单附件与黑盒，与厂内加工处于同一条制造事实链。\n3. Supplier MES Lite：供应商通过微信公众号/H5/Web 深度参与接单、设备匹配、上料、报工、质量记录与发货。\n4. 极简现场交互：任务、扫码、查看、开工、报工、异常，一分钟上手。\n5. 试模整改全闭环：Trial (T0/T1/T2) → Issue 缺陷归因 → 整改责任分派 → 验证 → Next Trial。'
                },
                {
                  title: '三、模具项目全流程闭环 (Golden Path)',
                  body: '客户询价 → 报价/销售确认 → 模具立项 → 项目节点计划 → 设计任务 (BOM/图纸) → 零件拆分 (前模仁/后模仁/滑块/电极) → 采购准备 + 工艺路线 → 内部加工 (CNC/EDM/线切割) + 外协加工 (Supplier MES) → 零件检验 → 装配齐套检查 → 试模 T0 → 缺陷 Issue → 整改验证 → T1/T2 → 客户确认 → 交付 → 成本结算与复盘。'
                },
                {
                  title: '四、第一版 P0 开发演进阶段',
                  body: 'Stage 0 系统基座 (组织/供应商/设备) → Stage 1 项目与驾驶舱 → Stage 2 设计/BOM/零件树 → Stage 3 工艺快照 → Stage 4 内部设备任务与报工 → Stage 5 外协派单与 Supplier Portal → Stage 6 采购与到货 IQC → Stage 7 质量与返工 → Stage 8 装配与 T0/T1 试模 → Stage 9 交付与关闭 → Stage 10 成本核算。'
                }
              ]
            }
          }
        ]
      },
      {
        title: '功能清单',
        items: [
          { id: 'workbench', title: '工作台 (生产看板)', desc: '厂长驾驶舱、今日排产甘特图与机台负荷。' },
          { id: 'bpm', title: '流程中心 BPM', desc: '基于 Flowable 8 的工艺受控签审与审批流。' },
          { id: 'plm', title: 'PLM 工艺设计器', desc: 'BOM 结构、工步工序、图纸绑定与四层就绪度。' },
          { id: 'mes', title: 'MES 制造执行', desc: '三码合一现场防呆、DPX 工位机与敏捷开报工。' },
          { id: 'aps', title: 'APS 排产中枢', desc: 'Planning Hub 数字白板、基线锁定与日历约束。' },
          { id: 'qms', title: 'QMS 质量管理', desc: '首检、巡检、MRB 不合格品处置与产品谱系。' },
          { id: 'wms', title: 'WMS 智能仓储', desc: '库位货架扫码、工单齐套预检与先进先出。' },
          { id: 'tool', title: 'Tool 刀具夹具', desc: '对刀参数、寿命预警、刃磨与报废台账。' },
          { id: 'esop', title: 'E-SOP 电子作业指导书', desc: '图纸步骤随工序动态下发与防呆触控。' },
          { id: 'erp', title: 'ERP 进销存', desc: '销售订单、采购协同、物料主档与生产需求算料。' },
          { id: 'report', title: '报表与 4K 生产大屏', desc: '产线节拍、机台 OEE、工单倒计时与 Andon 安灯。' }
        ]
      }
    ]
  },

  // 3. 开发指南 (对照截图 开发指南下拉及手册)
  'guide': {
    id: 'guide',
    name: '开发指南',
    groups: [
      {
        title: '基础能力',
        items: [
          {
            id: 'bpm-guide',
            title: '工作流 BPM 手册',
            desc: '基于 Flowable 8 的工艺审批流设计与开发。',
            content: {
              lead: '睿易制造平台内置基于 Flowable 8 的工作流引擎，用于工艺发布签审、工程变更审批、质量偏差特采等场景。',
              sections: [
                {
                  title: '功能边界',
                  body: '工作流主要负责状态流转、审批人鉴权与历史记录归档：',
                  table: {
                    headers: ['能力', '说明'],
                    rows: [
                      ['流程模型', '支持 BPMN 2.0 在线可视化设计器'],
                      ['业务单据', '业务数据独立存放，通过 processInstanceId 关联'],
                      ['审批操作', '通过、驳回、加签、委派、退回指定节点'],
                      ['工艺签审', '与 PLM 工艺四层就绪度 (Readiness) 强绑定']
                    ]
                  }
                }
              ]
            }
          },
          { id: 'form-dev', title: '表单开发', desc: '基于 form-create 的动态表单与字段权限配置。' },
          { id: 'fastexcel-dev', title: '单据打印与导出', desc: 'FastExcel 高性能流式导出与单据打印模板。' },
          { id: 'ui-components', title: '前端组件规范', desc: 'Element Plus 工业组件封装与 Hooks 开发。' },
          { id: 'system-dev', title: '系统管理', desc: 'Sa-Token 权限、菜单字典与操作日志。' },
          { id: 'infra-dev', title: '基础设施 Infra', desc: 'MyBatis-Plus 租户插件、Redis 缓存与锁。' }
        ]
      },
      {
        title: '业务模块开发',
        items: [
          { id: 'plm-dev', title: 'PLM 工艺包开发', desc: '工艺版本、工步参数与快照 Resolver。' },
          { id: 'mes-dev', title: 'MES 现场执行开发', desc: '双通道报工状态机与统一报工命令模型。' },
          { id: 'aps-dev', title: 'APS 排产排程开发', desc: '有限产能甘特图与班次可用日历算法。' },
          { id: 'qms-dev', title: 'QMS 质量追溯开发', desc: 'MRB 不合格品流转与独立返工工单。' },
          { id: 'wms-dev', title: 'WMS 仓储物流开发', desc: '库位动态分配与齐套性预检。' },
          { id: 'tool-dev', title: 'Tool 刀具管理开发', desc: '刀具生命周期与寿命预警机制。' }
        ]
      },
      {
        title: '现场与扩展',
        items: [
          { id: 'scan-service', title: 'ScanService 扫码引擎', desc: '统一工业码 MFG:// 解析与防抖。' },
          { id: 'ai-skills', title: 'AI 二开提示词与 Skills', desc: 'Antigravity / Cursor 二开加速技能包。' },
          { id: 'onlyoffice-ext', title: 'OnlyOffice 集成', desc: '工程图纸与工艺规程在线编辑集成。' }
        ]
      }
    ]
  },

  // 4. 博客文章 (对照截图 博客文章)
  'blog': {
    id: 'blog',
    name: '博客文章',
    groups: [
      {
        title: '技术与实战专栏',
        items: [
          {
            id: 'list',
            title: '文章列表',
            desc: '离散制造与机加工数字化前沿技术与架构实战。',
            content: {
              lead: '收录离散制造数字化转型、工业软件架构设计与现场踩坑实录。',
              sections: [
                {
                  title: '精选技术文章',
                  body: '• 《离散制造工单工艺快照隔离深度解析：如何彻底免疫工程图纸变更？》\n• 《现场三码合一设计：基于 MFG:// 工业码规范的 0 盲打极简执行》\n• 《Planning Hub 计划协同：从传统白板会议转向跨部门责任承诺基线》\n• 《为什么返工是一张独立新工单，而不是把主工艺升一版？》\n• 《Spring Boot 4 + PostgreSQL 16 JSONB 工业高并发架构实践》\n• 《基于 Flowable 8 的工艺设计器多级签审工作流闭环》'
                }
              ]
            }
          },
          { id: 'snapshot-article', title: '工艺快照隔离实战', desc: '在制工单免疫工程图纸变更的技术实现。' },
          { id: 'mfg-code-article', title: '三码合一现场扫码', desc: 'MFG:// 统一工业码设计与 DPX 工位机实践。' },
          { id: 'planning-article', title: 'Planning Hub 计划中枢', desc: '数字白板协作与计划基线偏差追踪。' },
          { id: 'rework-article', title: '独立返工工单设计', desc: '制造业工单状态机与质量判定权责分离。' }
        ]
      }
    ]
  },

  // 5. 商业版 / 版本差异 (对照截图 商业版)
  'commercial': {
    id: 'commercial',
    name: '商业版',
    groups: [
      {
        title: '商业版说明',
        items: [
          {
            id: 'diff',
            title: '版本差异对比',
            desc: '社区开源版、离散制造专业版与数字化工厂旗舰版全模块对比。',
            content: {
              lead: '睿易制造平台提供社区开源版、离散制造专业版与数字化工厂旗舰版三种版本，满足不同规模企业的数字化需求。100% 完整源码交付，一次买断长期使用。',
              sections: [
                {
                  title: '版本定位',
                  body: '不同版本的适用群体与交付标准：',
                  table: {
                    headers: ['版本', '定位', '适用场景'],
                    rows: [
                      ['社区开源版', '基础功能，开源维护', '个人学习、技术体验与单机验证'],
                      ['离散制造专业版', '聚焦标准工厂闭环', '单工厂、中小型机加工与离散装配企业'],
                      ['数字化工厂旗舰版', '多工厂协同一体化', '集团型企业、多工厂排程与深度二开支持']
                    ]
                  }
                }
              ]
            }
          },
          { id: 'notice', title: '商业版须知', desc: '交付流程、源码说明与实施部署准备。' },
          { id: 'roadmap', title: '商业版开发计划', desc: '各版本功能演进路线图与功能冻结原则。' },
          { id: 'user-guide', title: '商业版用户指南', desc: '厂长、工艺师与排产员操作说明书。' },
          { id: 'terms', title: '商业版使用条款', desc: '永久授权协议、源码使用与二次开发权能。' },
          { id: 'dependencies', title: '第三方依赖说明', desc: 'PostgreSQL、Redis、Flowable 8 依赖声明。' }
        ]
      },
      {
        title: '二次开发',
        items: [
          { id: 'ai-dev-guide', title: 'AI 二开指南', desc: '配合 AI Coding 极速扩展自定义业务模块。' }
        ]
      }
    ]
  },

  // 6. 在线体验 / 总览 (对照截图 在线体验总览)
  'demo': {
    id: 'demo',
    name: '在线体验',
    groups: [
      {
        title: '总览',
        items: [
          {
            id: 'home',
            title: '在线体验总览',
            desc: '3 分钟亲手体验 PC 管理端、21.5寸工位屏、仓储 PDA 与 4K 生产大屏。',
            content: {
              lead: '从 PC 调度后台到 21.5寸车间工位机、手持 PDA 与生产大屏，一套账号贯通全端。无需安装环境，直接在线上手实操。',
              sections: [
                {
                  title: '一、4 大场景终端体验入口',
                  body: '• PC 调度管理后台 (Vue 3 + Element Plus)\n• 21.5寸 MES 工位触摸屏 (DPX 大字号防呆)\n• 仓储 PDA 扫码端 (UniApp + unibest)\n• 车间 4K 生产数字大屏 (实时态势看板)'
                }
              ]
            }
          },
          { id: 'intro', title: '平台介绍', desc: '架构总纲与数字制造主线概览。' },
          { id: 'learning-path', title: '学习路线', desc: '从环境拉起到现场实施的成长路线图。' }
        ]
      }
    ]
  }
}
