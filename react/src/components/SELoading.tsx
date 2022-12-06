import { Alert, Spin } from "antd";

/**
 * 加载器组件
 */
export default function SELoading() {
  return (
    <div className="loading fit-width">
      <Spin tip="Loading">
        <Alert message="加载中" description="后台正在全力加载中" />
      </Spin>
    </div>
  );
}
