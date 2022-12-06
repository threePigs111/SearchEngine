import { Card, Col, Row, Space, Typography } from "antd";
import { ResultItemType } from "../../types";
import RichText from "../RichText";
import "./index.css";

const { Paragraph, Text } = Typography;

type RETitlePropsType = {
  title: string;
  url: string;
  keyword: string;
}

/**
 * 渲染搜索结果条目标题
 * 
 * - 点击标题跳转到 目标站点
 * - 标题对关键词的高亮
 * 
 * @param title 搜索结果条目 标题文本
 * @param url 搜索结果条目 URL文本
 * @param keyword 关键词
 * 
 */
function RETitle({ title, url, keyword} : RETitlePropsType) {
  return (
    <Text ellipsis>
      <a href={url} style={{fontSize: "1.4rem"}}>
        <RichText plainText={title} keyword={keyword} />
      </a>
    </Text>
  );
}

type REURLPropsType = {
  url: string;
}

/**
 * 对搜索结果的 URL 进行切片渲染
 * @param url 
 */
function REURL({ url }: REURLPropsType) {
  const pattern = /^(http:\/\/|https:\/\/)[^/]+\//;
  const baseURL = pattern.exec(url)![0].slice(0, pattern.exec(url)![0].length - 1);
  let s = "";
  url
    .split(baseURL + "/")[1]
    .split("/")
    .forEach((item: string) => {
      s += " > " + item;
    });
  return (
    <Row align="bottom">
      <Col span={23}>
        <Text ellipsis className="fit-width">
          <a href={url} style={{ fontFamily: "monospace" }}>
            <span style={{ color: "black" }}>{baseURL}</span>
            <span style={{ color: "gray" }}>{s}</span>
          </a>
        </Text>
      </Col>
    </Row>
  );
}

type ResultItemPropsType = {
  keyword: string;
  item: ResultItemType
}

/**
 * 搜索结果条目
 * 
 * @param keyword 关键词 
 * @param item 搜索结果类
 */
export default function ResultItem({ keyword, item }: ResultItemPropsType ) {
  const date =  `${new Date(item.dayTime).toLocaleDateString() } ${new Date(item.dayTime).toLocaleTimeString()}`;

  return (
    <Card bordered={false} size="small" key={item.id} style={{ maxWidth: 600 }}>
      <div className="result-wrapper">
        <REURL url={item.url} />
        <RETitle title={item.title} url={item.url} keyword={keyword} />
        <Paragraph ellipsis={{ rows: 2 }}>
          <RichText plainText={item.detail} keyword={keyword} />
        </Paragraph>
        <Space>
          <Text type="secondary">{date}</Text>
          <Text type="secondary" strong>{item.author}</Text>
        </Space>
      </div>
    </Card>
  );
}
