import { AudioOutlined } from "@ant-design/icons";
import { Layout, Input, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SEFooter from "../components/SEFooter";
import "./App.css";
const { Content } = Layout;
const { Search } = Input;
const { Title } = Typography;

export default function App() {
  const [keyword, setKeyword] = useState<string>("");

  /**
   * 搜索框输入内容时调用 
   * @parm e 事件源
   */
  function onChangeKeyWord(e: any) {
    setKeyword(e.target?.value);
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <div className="search-area">
          <Title level={2}>{import.meta.env.VITE_PRO_NAME}</Title>
          <Search
            enterButton={<Link to={"/search?word=" + keyword}>搜索</Link>}
            size="large"
            onChange={onChangeKeyWord}
            suffix={<AudioOutlined />}
          />
        </div>
      </Content>
      <SEFooter />
    </Layout>
  );
}
