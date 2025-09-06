import React, { useState, useEffect } from "react";
import { appInfoService } from "../services/appInfoService";
import { AppInfo } from "../../shared/types";

const HomePage: React.FC = () => {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppInfo = async () => {
      const result = await appInfoService.getAppInfo();

      if (result.isSuccess && result.data) {
        setAppInfo(result.data);
      } else {
        setError(result.error?.message || "未知错误");
      }
      setLoading(false);
    };

    fetchAppInfo();
  }, []);

  if (loading) {
    return <div>正在加载应用信息...</div>;
  }

  if (error) {
    return <div>错误：{error}</div>;
  }

  return (
    <div>
      <h1>应用信息</h1>
      {appInfo && (
        <>
          <p>应用版本: {appInfo.version}</p>
          <p>
            创建日期: {new Date(appInfo.creation_date).toLocaleDateString()}
          </p>
        </>
      )}
    </div>
  );
};

export default HomePage;
