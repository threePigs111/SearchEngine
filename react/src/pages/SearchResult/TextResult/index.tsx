import { Layout, Space } from "antd";
import { useEffect, useState } from "react";
import ResultItem from "../../../components/ResultItem";
import "./index.css";
import { getSearchResultAPI } from "../../../api/search";
import SELoading from "../../../components/SELoading";
import { ResultItemType } from "../../../types";
const { Content } = Layout;

type PropsType = {
  keyword: string;
}

/**
 * 搜索结果页
 * 
 * 请求搜索结果，并渲染一个搜索结果条目数组
 * 对后端返回速度慢做了加载动画
 * @param param0 
 * @returns 
 */
export default function TextResult({ keyword } : PropsType) {
  // 搜索结果列表
  const [resultList, setResultList] = useState<ResultItemType[]>();

  // 加载状态
  const [loading, setLoading] = useState(true);

  /**
   * 预处理结果列表
   * 
   * 修改列表中的每一项的 detail 属性
   * 查找关键词位置，切出关键词前后共200个字符
   * 优化关键词高亮效果
   * 
   * @param data 后端发来的结果列表
   */
  function initialResultList(data: ResultItemType[]) {
    setResultList(
      data.map((item: ResultItemType) => {
        const pos = item.detail.indexOf(keyword);
        const reg = /[^A-Za-z0-9\u4e00-\u9fa5+]/g;
        let i = pos;
        for (i = pos; i > 0; i--) {
          if (reg.test(item.detail[i])) break;
        }
        const detail = item.detail.slice(
          i + 1,
          i + 100 <= item.detail.length ? pos + 100 : item.detail.length
        );
        return {
          ...item,
          detail: detail.replace(/\s*/g, "")
        };
      })
    );
  }

  // 首次加载向后端请求数据
  useEffect(() => {
    searchResult(keyword);
  }, []);

  /**
   * 请求搜索结果
   * 
   * @param content 关键词
   */
  async function searchResult(content: string) {

    // 搜索结果 json 对象
    const res = await getSearchResultAPI({ word: content });

    initialResultList(res.data.data);
    setLoading(false);
  }

  if (loading) return <SELoading />;
  else
    return (
      <Content style={{ backgroundColor: "white" }}>
        <Space direction="vertical" size="small">
          <div className="result-info">共找到 {resultList?.length} 条结果</div>
          <div className="result-list">
            {resultList
              ?.map((item, index) => (
                <ResultItem
                  item={item}
                  key={index}
                  keyword={keyword}
                />
              ))}
          </div>
        </Space>
      </Content>
    );
}
