import React from 'react';

export default function AppLayout() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 顶部菜单栏 */}
      <header style={{ height: '140px', backgroundColor: '#e6f7ff', padding: '10px' }}>
        {/* 顶部选项卡 */}
        <div style={{ marginBottom: '10px' }}>
          <button>数据管理</button>
          <button>开发效果</button>
          <button>指标预测</button>
          <button>查询</button>
        </div>

        {/* 工具栏分段 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ background: '#fff1f0', padding: '5px' }}>
            <button>打开</button>
            <button>保存</button>
          </div>
          <div style={{ background: '#fffbe6', padding: '5px' }}>
            <button>用户管理</button>
          </div>
          <div style={{ background: '#f6ffed', padding: '5px' }}>
            <button>属性设置</button>
          </div>
          <div style={{ background: '#e6fffb', padding: '5px' }}>
            <button>备份数据库</button>
            <button>恢复数据库</button>
            <button>压缩和修复数据库</button>
          </div>
          <div style={{ background: '#f9f0ff', padding: '5px' }}>
            <button>使用手册</button>
          </div>
        </div>
      </header>

      {/* 页面主体 */}
      <main style={{ flex: 1, display: 'flex' }}>
        
        {/* 左侧导航 */}
        <aside style={{ width: '200px', backgroundColor: '#fafafa', padding: '10px' }}>
          <h4>导航</h4>
          <ul>
            <li>采油单位管理</li>
            <li>油田管理</li>
            <li>转移方式管理</li>
            <li>规划计划管理</li>
          </ul>
        </aside>

        {/* 中间内容区域 */}
        <section style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '10px' }}>
          <nav style={{ marginBottom: '10px' }}>
            <button>数据库</button>
            <button>数据管理</button>
            <button>开发效果（单指标）</button>
            <button>开发效果（多指标）</button>
            <button>指标预测</button>
            <button>查询方案</button>
          </nav>
          <div style={{ backgroundColor: '#d9d9d9', height: '100%' }}>
            {/* 标签内容区域 */}
          </div>
        </section>

        {/* 右侧属性窗 */}
        <aside style={{ width: '250px', backgroundColor: '#ffffff', padding: '10px' }}>
          <h4>属性窗口</h4>
          {/* 属性内容 */}
        </aside>
      </main>
    </div>
  );
}

