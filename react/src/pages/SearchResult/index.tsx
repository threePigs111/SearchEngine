import { Divider, Layout, Menu } from "antd";
import { useState } from "react";
import SEFooter from "../../components/SEFooter";
import SEHeader from "../../components/SEHeader";
import "./index.css";
import { Link, useSearchParams } from "react-router-dom";
import TextResult from "./TextResult";
const { Content } = Layout;

/**
 * 搜索结果页
 * 
 * 由顶部输入框 SEHeader, 文本结果列表 TextResult, 底栏 SEFooter 组成
 * 从 URL 中获取搜索关键词，传递给 TextResult
 */
export default function SearchResult() {

  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("word") || "");

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <SEHeader keyword={keyword} setKeyword={setKeyword} />

        <Content
          className="result-content"
          style={{ overflowY: "scroll", backgroundColor: "white" }}>
          <Menu
            mode="horizontal"
            selectedKeys={["text"]}>
            <Menu.Item key="text">
              <Link to={`/search?word=${keyword}`}>文本</Link>
            </Menu.Item>
          </Menu>
          <TextResult
            keyword={keyword}
          />
          <Divider />
        </Content>
        <SEFooter />
      </Layout>
    </>
  );
}
