import * as React from "react";
import { Card, useToasts } from "@zeit-ui/react";
import copy from "clipboard-copy";
import { Delete } from "@zeit-ui/react-icons";

export interface Template {
  label: string;
  value: string;
}

interface Props {
  templates: Template[];
  setTemplates: (target: Template[]) => void;
}

export const TemplateList = (props: Props) => {
  const [, setToast] = useToasts();
  const reaction = (type: "success", label: string) =>
    setToast({
      text: `${label} is successfully deleted!!`,
      type,
    });
  const remove = (label: string) => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "removeTemplate",
        label: label,
      },
      () => {
        reaction("success", label);
        const nextTemplates = Array.from(props.templates).filter(
          (temp) => temp.label !== label
        );
        props.setTemplates(nextTemplates);
      }
    );
  };
  return (
    <div className="templateList">
      {props.templates.length === 0 ? (
        <TemplateNotFound />
      ) : (
        props.templates.map((template, idx) => {
          return (
            <TemplateListEl
              {...template}
              remove={remove}
              key={`template--list__el__${idx}`}
            />
          );
        })
      )}
    </div>
  );
};

interface ElProps extends Template {
  remove: (target: string) => void;
}

const TemplateListEl = (props: ElProps) => {
  return (
    <li>
      <Card hoverable onClick={() => copy(props.value)}>
        <div className="template--listel">
          <div className="el--content">{props.label}</div>
          <div
            className="el--icon"
            onClick={() => {
              props.remove(props.label);
            }}>
            <Delete />
          </div>
        </div>
      </Card>
    </li>
  );
};

const TemplateNotFound = () => {
  return <div className="template--notfound">not found</div>;
};
