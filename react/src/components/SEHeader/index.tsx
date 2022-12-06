import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
const { Search } = Input;

type PropsType = {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

/**
 * 结果页页头
 * 
 * 包括搜索引擎名称，搜索框
 * 
 * 从环境变量中拿到名称
 * 
 * @param keyword 关键字
 * @param setKeyword 在父组件中注册的 setter
 */

export default function SEHeader({keyword, setKeyword}: PropsType) {

  // 临时 state，储存子组件本身的关键词
  const [tmp, setTmp] = useState(keyword);

  const navigate = useNavigate();

  // 父组件传递的关键词变更时，重置关键词
  useEffect(() => {
    setTmp(keyword);
  }, [keyword]);

  // 搜索框输入时调用
  function onChangeKeyword(e: any) {
    setTmp(e.target.value);
  }

  /**
   * 点击搜索按钮时调用
   * 
   * 同步父组件的关键词，并跳转到相应页面
   */
  function onSearch() {
    setKeyword(tmp);
    navigate(`/search?word=${tmp}`);
    navigate(0);
  }

  return (
    <header className="header-wrapper">
      <div style={{width: "100px"}}>
        <a href="/" style={{fontWeight: 800, fontSize: "18px"}}>{import.meta.env.VITE_PRO_NAME}</a>
      </div>
      <div className="search-bar">
        <Search
          size="large"
          defaultValue={keyword}
          value={tmp}
          onChange={onChangeKeyword}
          onSearch={onSearch}
        />
      </div>
    </header>
  );
}
