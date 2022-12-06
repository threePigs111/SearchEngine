import { Typography } from "antd";
const { Text } = Typography;

type PropsType = {
  plainText: string;
  keyword: string;
}

/**
 * 高亮文本
 * 
 * 支持一个关键词的高梁
 * 
 * 通过对关键词的切片、重组，渲染高亮关键词
 * @param plainText 原文本
 * @param keyword 关键字
 */

export default function RichText({plainText, keyword}: PropsType) {
  const tmp = plainText.split(keyword);

  return <>
    {tmp.map((item: string, index) => {
      return (
        <span key={index}>
          {item}
          {index !== tmp.length - 1 ? <Text type="danger">{keyword}</Text> : null}
        </span>
      );
    })};
  </>;

}
