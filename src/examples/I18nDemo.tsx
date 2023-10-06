import React, { useState } from 'react';
import { Alert, Button, Modal, Radio, ConfigProvider } from 'antd';
import type { RadioChangeEvent } from 'antd';

import type { Locale } from 'antd/es/locale';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import zhHK from 'antd/locale/zh_HK';

import '../i18n/i18n';
// 引入 useTranslation
import { useTranslation } from 'react-i18next';

export default function Demo() {
  const [locale, setLocal] = useState<Locale>(enUS);

  // 在 函数式组件 中使用useTranslation 的 hook 来处理国际化
  const { t, i18n } = useTranslation();

  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;
    setLocal(localeValue);
    // i18n.changeLanguage(localeValue);
  };

  const change = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const info = () => {
    Modal.info({
      title: 'some info',
      content: 'some info',
    });
  };

  return (
    <div>
      demo
      <Radio.Group value={locale} onChange={changeLocale}>
        <Radio.Button key="en" value={enUS}>
          English
        </Radio.Button>
        <Radio.Button key="cn" value={zhCN}>
          中文简体
        </Radio.Button>
        <Radio.Button key="hk" value={zhHK}>
          中文繁体
        </Radio.Button>
      </Radio.Group>
      {/* antd i18n */}
      <ConfigProvider locale={locale}>
        <Alert message="Success Text" type="success" />;
        <Button type="primary" onClick={info}>
          Primary Button
        </Button>
      </ConfigProvider>
      {/* custum i18n */}
      <Button onClick={() => change('zhCN')}>切换到中文</Button>
      <div> {t('login')}</div>
    </div>
  );
}
