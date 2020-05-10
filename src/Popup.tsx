import * as React from "react";
import copy from "clipboard-copy";
import "./popup.scss";
import { AddBoiler } from "./components/AddBoiler";
import { Loading } from "@zeit-ui/react";
import { Template, TemplateList } from "./components/TemplateList";

export const Popup = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [templates, setTemplates] = React.useState<Template[]>([]);

  React.useEffect(() => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "getTemplates",
      },
      (res: Template[]) => {
          console.log(res)
        setTemplates(res);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <div className="popup">
      <AddBoiler templates={templates} setTemplates={setTemplates} />
      {isLoading ? (
        <Loading>Loading</Loading>
      ) : (
        <TemplateList templates={templates} />
      )}
    </div>
  );
};
