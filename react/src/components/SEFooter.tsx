import { Button, Space } from "antd";

/**
 * 底栏
 * 
 * 从环境变量中获取名称
 */ 
const SEFooter = () => {

  return (
    <div style={{padding: "1vw"}}>
      <Space>
        <Button type="text">关于{import.meta.env.VITE_PRO_NAME}</Button>
      </Space>
    </div>
  );
};

export default SEFooter;
